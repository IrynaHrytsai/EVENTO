const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    event_date: { type: Date, required: true }, 
    organizer: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }]
});

module.exports = mongoose.model('Event', eventSchema);
