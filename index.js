const express = require('express');
const bodyParser = require('body-parser'); // For parsing request bodies
const { Sequelize, sequelize } = require('./models');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies

// Import your route files
const carsRoutes = require('./routes/carroutes');
const bookingsRoutes = require('./routes/bookingroutes');

// Use your route files
app.use('/cars', carsRoutes); // All car-related routes will start with /cars
app.use('/bookings', bookingsRoutes); // All booking-related routes will start with /bookings
// Initialize the Sequelize connection and sync the database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database synchronization failed:', error);
  });
