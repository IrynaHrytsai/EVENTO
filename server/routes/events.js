const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Participant = require('../models/Participant');
const { getAllEvents, createEvent } = require('../controllers/eventsController');

router.get('/participants', async (req, res) => {
    try {
        const participants = await Participant.find();
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching participants: ' + error.message });
    }
});


router.post('/register', async (req, res) => {
    const { fullName, email, dob, source } = req.body;

    if (!fullName || !email || !dob || !source) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newParticipant = new Participant({ fullName, email, dob: new Date(dob), source });
    try {
        await newParticipant.save();
        res.status(201).json({ message: 'Participant registered successfully', participant: newParticipant });
    } catch (error) {
        res.status(400).json({ message: 'Error registering participant: ' + error.message });
    }
});


router.get('/', getAllEvents);

router.post('/', createEvent);

module.exports = router;
