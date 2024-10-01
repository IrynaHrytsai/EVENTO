import React, { useEffect, useState } from 'react';

const Participants = ({ eventId }) => {
    const [participants, setParticipants] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            console.log('Fetching participants for eventId:', eventId); 
            if (!eventId) {
                setError('Event ID is required.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/participants?eventId=${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to load participants: ' + response.statusText);
                }
                const data = await response.json();
                setParticipants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants(); 
    }, [eventId]); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="mt-8"> 
            <h2 className="text-2xl font-semibold mb-4">Participants List</h2>
            <ul>
                {participants.length > 0 ? (
                    participants.map(participant => (
                        <li key={participant._id}>
                            {participant.fullName} ({participant.email}) - Date of Birth: {new Date(participant.dob).toLocaleDateString('en-GB')}
                        </li>
                    ))
                ) : (
                    <li>No participants to display.</li>
                )}
            </ul>
        </div>
    );
};

export default Participants;
