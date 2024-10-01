const express = require('express');
const ContactMessage = require('../models/ContactMessage'); 

const router = express.Router();


router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    const newMessage = new ContactMessage({
        name,
        email,
        message,
    });

    try {
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

module.exports = router;
