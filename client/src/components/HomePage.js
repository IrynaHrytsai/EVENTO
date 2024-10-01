import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsBoard from './EventsBoard';
import eventImage from '../assets/event.png';
import AboutUs from './AboutUs';

const HomePage = () => {
    const navigate = useNavigate();
    const eventsRef = useRef(null);

    const handleSelectEvent = () => {
        if (eventsRef.current) {
            eventsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col pt-24 pb-28 items-center justify-center min-h-screen text-center text-gray-800">
            <h1 className="text-5xl text-white font-extrabold mb-6">Welcome to EVENTO!</h1>
            <img
                src={eventImage} 
                alt="Events"
                className="mb-6 rounded-lg shadow-none transition-transform duration-300 hover:scale-105 w-3/4 max-w-lg" 
            />
            <button
                onClick={handleSelectEvent}
                className="bg-purple-600 text-white px-16 py-3 rounded-lg shadow-md hover:bg-purple-700 transition transform duration-300 hover:scale-105"
            >
                Learn More
            </button>

            <div className="mt-12" ref={eventsRef}> 
                <AboutUs />
                <EventsBoard /> 
            </div>
        </div>
    );
};

export default HomePage;
