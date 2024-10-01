const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    dob: { type: Date, required: true }, 
    source: { type: String, required: true }, 
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], 
    registrationDate: { type: Date, default: Date.now } 
}, { timestamps: true }); 


participantSchema.index({ email: 1, events: 1 }, { unique: false });


module.exports = mongoose.model('Participant', participantSchema);
