import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

Chart.register(...registerables);

const ParticipantDetail = () => {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [registrationData, setRegistrationData] = useState({});

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/participants?eventId=${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to load participants');
                }
                const data = await response.json();
                setParticipants(data);

               
                const registrationCounts = {};
                data.forEach(participant => {
                    const date = new Date(participant.registrationDate).toLocaleDateString('en-GB');
                    registrationCounts[date] = (registrationCounts[date] || 0) + 1; 
                });

                const labels = Object.keys(registrationCounts);
                const counts = Object.values(registrationCounts);

                
                if (labels.length === 0 || counts.length === 0) {
                    setRegistrationData({
                        labels: ['No Data'],
                        datasets: [
                            {
                                label: 'Registrations per Day',
                                data: [0], 
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true,
                            },
                        ],
                    });
                } else {
                    setRegistrationData({
                        labels,
                        datasets: [
                            {
                                label: 'Registrations per Day',
                                data: counts,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true,
                            },
                        ],
                    });
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchParticipants();
        } else {
            setError('Event ID is required.');
            setLoading(false);
        }

        return () => {
            setRegistrationData({});
        };
    }, [eventId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const filteredParticipants = participants.filter(participant =>
        participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl mt-10 font-bold mb-6">Event Participants</h2>

            
            <div className="mb-24 w-full bg-opacity-70 rounded-lg bg-gray-200 mt-16 mx-auto" style={{ maxHeight: '400px', overflow: 'hidden' }}>
                <h3 className="text-lg mt-7 font-semibold mb-4">Registrations per Day</h3>
                <Line 
                    data={registrationData} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    precision: 0,
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    
                                },
                            },
                        },
                    }} 
                />
            </div>

           
            <div className="relative mb-4 w-4/5 mx-auto bg-gray-100 bg-opacity-70 p-3 rounded-lg shadow-sm">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-4 py-2 w-full pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                />
                <MagnifyingGlassIcon className="h-6 w-6 ml-1 text-gray-500 absolute left-3 mt-3 top-2.5" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 mb-44 lg:grid-cols-3 gap-4">
                {filteredParticipants.length > 0 ? (
                    filteredParticipants.map(participant => (
                        <div key={participant._id} className="bg-gray-100 bg-opacity-70 border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                            <h3 className="text-lg font-semibold">{participant.fullName}</h3>
                            <p className="text-gray-600">Email: {participant.email}</p>
                        </div>
                    ))
                ) : (
                    <p>No participants found!</p>
                )}
            </div>
        </div>
    );
};

export default ParticipantDetail;
