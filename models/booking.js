'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Car, { foreignKey: 'carId' });
    }
  }
  Booking.init({
    startDateTime: DataTypes.DATE,
    endDateTime: DataTypes.DATE,
    carId: {
      type: DataTypes.INTEGER, // Assuming carId is of type INTEGER
      allowNull: false,       // Ensure carId is required
      references: {
        modelName: 'Car',        // Reference the 'Car' model
        key: 'id'            // Use the 'id' primary key of the 'Car' model
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};