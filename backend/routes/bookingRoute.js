const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const User = require('../models/user.js')

router.post('/hbooking', async (req, res) => {
    const { userid, checkInDate, checkOutDate, location, status } = req.body;

    try {
        const newBooking = new Booking({
            userid,
            checkInDate,
            checkOutDate,
            location,
            status
        });
        await newBooking.save();

        const formattedBooking = {
            _id: newBooking._id,
            checkInDate: newBooking.checkInDate.toLocaleDateString('en-GB'), // Format as DD/MM/YYYY
            checkOutDate: newBooking.checkOutDate.toLocaleDateString('en-GB'), // Format as DD/MM/YYYY
            location: newBooking.location,
            status:newBooking.status
        };

        res.json(formattedBooking);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Booking failed', error });
    }
});

router.post('/bookconfirm', async (req, res) => {
    const { bookingId, status } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update booking status', error });
    }
});

router.post('/getbookingsbyuserid', async (req, res) => {
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});
router.post("/cancelbooking", async (req, res) => {
    const { bookingId } = req.body;
    try {
        const booking = await Booking.findOne({ _id: bookingId });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.status = 'cancelled';
        await booking.save();
        res.send('Your booking was cancelled successfully');
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
});

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find().populate({
            path: 'userid',
            model: User,
            select: 'name employeeId'
        });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ error });
    }
});


module.exports = router;
