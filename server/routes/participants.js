const express = require('express');
const Participant = require('../models/Participant'); 
const router = express.Router();


router.get('/', async (req, res) => {
    const { eventId } = req.query; 

    try {
        if (!eventId) {
            return res.status(400).json({ message: 'Event ID is required.' });
        }

        
        const participants = await Participant.find({ events: eventId }).populate('events', 'name');
        res.json(participants);
    } catch (error) {
        console.error('Error fetching participants:', error);
        res.status(500).json({ message: 'Error fetching participants.' });
    }
});


router.post('/', async (req, res) => {
    const { fullName, email, dob, source, events } = req.body;


    if (!fullName || !email || !dob || !events || events.length === 0) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
    
        const dobDate = new Date(dob);

     
        let participant = await Participant.findOne({ email }).populate('events');

       
        if (participant) {
            const newEvents = events.filter(event => !participant.events.map(e => e.toString()).includes(event));

            if (newEvents.length === 0) {
                return res.status(400).json({ message: 'You are already registered for these events.' });
            }

         
            participant.events.push(...newEvents);
            await participant.save(); 
        } else {
           
            participant = new Participant({
                fullName,
                email,
                dob: dobDate,
                source,
                events,
            });

            await participant.save(); 
        }

        
        const populatedParticipant = await Participant.findById(participant._id).populate('events', 'name');
        res.status(201).json(populatedParticipant); 
    } catch (error) {
        console.error('Error saving participant:', error);
        res.status(500).json({ message: 'Error saving participant.' });
    }
});

module.exports = router;
