// controllers/bookingController.js
const { Booking, Car } = require('../models');
const { Op } = require('sequelize');
// Create a new booking
async function createBooking(req, res) {
  const { startDateTime, endDateTime, carId, userId } = req.body;

  try {
    // Check if the selected car is available for the specified period
    const isCarAvailable = await isCarAvailableForBooking(carId, startDateTime, endDateTime);

    if (!isCarAvailable) {
      return res.status(400).json({ error: 'Car is not available for the selected period' });
    }

    const booking = await Booking.create({
      startDateTime,
      endDateTime,
      carId,
      //userId, // Assuming you have a userId associated with the booking
      // Add other booking data as needed
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ error: `${error}` });
  }
}

// Get bookings for a specific car by carId
async function getBookingsByCarId(req, res) {
  const { carId } = req.params;

  try {
    const bookings = await Booking.findAll({ where: { carId } });

    if (!bookings) {
      return res.status(404).json({ error: 'No bookings found for the car' });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching bookings' });
  }
}

// Delete a booking by booking ID
async function deleteBooking(req, res) {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.destroy();
    return res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting booking' });
  }
}

// Function to check if a car is available for booking in the specified period
async function isCarAvailableForBooking(carId, startDateTime, endDateTime) {
  const existingBooking = await Booking.findOne({
    where: {
      carId,
      startDateTime: {
        [Op.lt]: endDateTime,
      },
      endDateTime: {
        [Op.gt]: startDateTime,
      },
    },
  });

  return !existingBooking;
}

module.exports = {
  createBooking,
  getBookingsByCarId,
  deleteBooking,
};
