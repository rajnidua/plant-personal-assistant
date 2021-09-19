const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Frequency extends Model {}

Frequency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    frequency_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    watering_freq_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    watering_freq_interval: {
      type: DataTypes.ENUM('Days', 'Weeks', 'Months', 'Hours', 'Years'),
      allowNull: false,
      defaultValue: 'Days',
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'frequency',
  }
);

module.exports = Frequency;
