const mongoose = require('mongoose');

// Define the SIM Card schema
const simCardSchema = new mongoose.Schema({
    simNumber: { type: String, required: true, unique: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    activationDate: { type: Date }
});

// Create the SIM Card model
const SimCard = mongoose.model('simcard', simCardSchema);



module.exports = SimCard;
