import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterEvent = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [source, setSource] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [eventNames, setEventNames] = useState({});
    const navigate = useNavigate();
    const { eventId } = useParams();

    useEffect(() => {
        const fetchEventNames = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/events');
                const text = await response.text();

                if (response.ok) {
                    const events = JSON.parse(text);
                    const names = {};
                    events.forEach(event => {
                        names[event._id] = event.name;
                    });
                    setEventNames(names);
                } else {
                    console.error('Failed to load event names:', text);
                }
            } catch (error) {
                console.error('Error fetching event names:', error);
            }
        };

        fetchEventNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !dob || !eventId) {
            setModalMessage('All fields are required.');
            setShowModal(true);
            return;
        }

        const dobDate = new Date(dob).toISOString();
        const participantData = { fullName, email, dob: dobDate, source, events: [eventId] };

        try {
            const response = await fetch('http://localhost:4000/api/participants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(participantData),
            });

            const text = await response.text();

            if (response.ok) {
                setModalMessage('Registration successful! Thank you for registering.');
                setShowModal(true);

                setTimeout(() => {
                    setShowModal(false);
                    navigate('/success');
                }, 3000);
            } else {
                setModalMessage(`Registration failed: ${text || "Something went wrong. Please try again."}`);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setModalMessage('An error occurred during registration. Please try again.');
            setShowModal(true);
        }
    };

    return (
        <div className="flex justify-center text-gray-800 items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-200 bg-opacity-70 p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl text-gray-800 text-center font-bold mb-4">Register for Event</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 text-gray-800 mb-4 border border-gray-300 rounded-lg bg-transparent"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 text-gray-800 mb-4 border border-gray-300 rounded-lg bg-transparent"
                    required
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2 text-gray-800 mb-4 border border-gray-300 rounded-lg bg-transparent"
                    required
                />
                <div className="mb-4 text-gray-800">
                    <p className="text-gray-800 font-semibold mb-2">How did you hear about us?</p>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="social media"
                                checked={source === 'social media'}
                                onChange={(e) => setSource(e.target.value)}
                                className="mr-2"
                            />
                            Social Media
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="friends"
                                checked={source === 'friends'}
                                onChange={(e) => setSource(e.target.value)}
                                className="mr-2"
                            />
                            Friends
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="found it myself"
                                checked={source === 'found it myself'}
                                onChange={(e) => setSource(e.target.value)}
                                className="mr-2"
                            />
                            Found it Myself
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Register
                </button>
            </form>

            {showModal && (
                <div className="fixed inset-0 text-center bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Notification</h2>
                        <p>{modalMessage}</p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 ml-1 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterEvent;
