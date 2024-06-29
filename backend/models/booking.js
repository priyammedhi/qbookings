const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;