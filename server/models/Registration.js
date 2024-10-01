const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    participantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Participant', 
        required: true 
    },
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event', 
        required: true 
    }
}, {
    timestamps: true 
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
