const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    botanical_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sun_exposure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mature_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soil_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_planted: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    date_purchased: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_watering_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id',
      },
    },

    watering_freq_num: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1',
    },
    watering_freq_interval: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Days',
    },
    next_watering_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;
