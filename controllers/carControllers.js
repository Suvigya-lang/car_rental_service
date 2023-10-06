const { Car } = require('../models');

async function getAllCars(req, res) {
    try {
      const cars = await Car.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching cars' });
    }
  }
  
  // Get a car by ID
  async function getCarById(req, res) {
    const { id } = req.params;
  
    try {
      const car = await Car.findByPk(id);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching car by ID' });
    }
  }
  
  // Create a new car
  async function createCar(req, res) {
    const { make, model, year,price } = req.body;
  
    try {
      const car = await Car.create({
        make,
        model,
        year,
        price
        // Add other car properties as needed
      });
  
      return res.status(201).json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating car' });
    }
  }
  
  // Update a car by ID
  async function updateCar(req, res) {
    const { id } = req.params;
    const { make, model, year,price } = req.body;
  
    try {
      const car = await Car.findByPk(id);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      car.make = make;
      car.model = model;
      car.year = year;
      car.price=price;
      // Update other car properties as needed
      await car.save();
  
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating car' });
    }
  }
  
  // Delete a car by ID
  async function deleteCar(req, res) {
    const { id } = req.params;
  
    try {
      const car = await Car.findByPk(id);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      await car.destroy();
      return res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting car' });
    }
  }
  
  module.exports = {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
  };