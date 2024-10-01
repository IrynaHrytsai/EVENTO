const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');


router.post('/', async (req, res) => {
    const { fullName, email, dob, source, eventId } = req.body;

    
    if (!fullName || !email || !dob || !source || !eventId) {
        return res.status(400).json({ message: 'Всі поля є обов’язковими.' });
    }

    try {
       
        let participant = await Participant.findOne({ email });

        if (!participant) {
      
            participant = new Participant({
                fullName,
                email,
                dob: new Date(dob),  
                source,
                events: [eventId]  
            });
        } else {
        
            if (!participant.events.includes(eventId)) {
                participant.events.push(eventId);  
            }
        }


        const savedParticipant = await participant.save();
        res.status(201).json({ savedParticipant });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
     
        const participants = await Participant.find().populate('events');
        res.json(participants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
