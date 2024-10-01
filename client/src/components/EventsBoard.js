import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const EventsBoard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortFields, setSortFields] = useState({ date: null, organizer: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchValue) ||
      event.description.toLowerCase().includes(searchValue) ||
      event.organizer.toLowerCase().includes(searchValue)
    );
    setFilteredEvents(filtered);
  };

  const handleSortChange = (field, order) => {
    setSortFields(prev => ({ ...prev, [field]: order }));
  };

  const handleRegisterClick = (eventId) => {
    navigate(`/register/${eventId}`);
  };

  const handleViewClick = (eventId) => {
    navigate(`/participants/${eventId}`);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSortFields({ date: null, organizer: null });
    setFilteredEvents(events);
  };

  useEffect(() => {
    const sortedEvents = [...filteredEvents];
    if (sortFields.date || sortFields.organizer) {
      sortedEvents.sort((a, b) => {
        let compare = 0;

        if (sortFields.date) {
          compare = new Date(a.event_date) - new Date(b.event_date);
        }

        if (compare === 0 && sortFields.organizer) {
          compare = a.organizer.localeCompare(b.organizer);
        }

        return sortFields.date === 'asc' ? compare : -compare;
      });
    }
    setFilteredEvents(sortedEvents);
  }, [sortFields]);

  return (
    <div className="container mx-auto p-4 mt-24 md:mt-32 text-white rounded-lg shadow-lg">
      <h2 className="text-4xl text-white mb-10 font-bold">Events Board</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by title, description, or organizer"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 w-full pl-10 rounded bg-gray-200 bg-opacity-70 text-gray-800" 
        />
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 absolute left-3 top-2.5" />
      </div>

      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => handleSortChange('date', sortFields.date === 'asc' ? 'desc' : 'asc')}
          className={`px-4 py-2 rounded ${sortFields.date ? 'bg-green-500 text-white' : 'bg-gray-300'} transition`}
        >
          Sort by Date {sortFields.date === 'asc' ? '↑' : '↓'}
        </button>
        <button
          onClick={() => handleSortChange('organizer', sortFields.organizer === 'asc' ? 'desc' : 'asc')}
          className={`px-4 py-2 rounded ${sortFields.organizer ? 'bg-purple-500 text-white' : 'bg-gray-300'} transition`}
        >
          Sort by Organizer {sortFields.organizer === 'asc' ? '↑' : '↓'}
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 transition"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event._id} className="bg-gray-200 bg-opacity-70 border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.event_date).toLocaleDateString()}</p>
              <p className="text-gray-500">Organizer: {event.organizer}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleRegisterClick(event._id)}
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition mr-2"
                >
                  Register
                </button>
                <button
                  onClick={() => handleViewClick(event._id)}
                  className="bg-red-500 text-white hover:bg-red-600 rounded px-4 py-2 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No events found!</p>
        )}
      </div>
    </div>
  );
};

export default EventsBoard;
