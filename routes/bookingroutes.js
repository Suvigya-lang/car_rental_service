// routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Define booking-related routes
router.post('/', bookingController.createBooking);
//router.get('/:id', bookingController.getBookingById);
router.get('/car/:carId', bookingController.getBookingsByCarId);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
