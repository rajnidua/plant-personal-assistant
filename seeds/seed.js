const sequelize = require('../config/connection');
const { User, Plant, Category, Frequency, Location } = require('../models');

const userData = require('./userData.json');
const plantData = require('./plantData.json');
const categoryData = require('./categoryData.json');
const locationData = require('./locationData.json');
// const frequencyData = require('./frequencyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categoryData) {
    await Category.create({
      ...category,
    });
  }

  for (user of users) {
    for (const location of locationData) {
      await Location.create({
        ...location,
        owner_id: user.id,
      });
    }

    /* for (const frequency of frequencyData) {
      await Frequency.create({
        ...frequency,
        owner_id: user.id,
      });
    } */
  }
  for (const plant of plantData) {
    await Plant.create({
      ...plant,
    });
  }

  process.exit(0);
};

seedDatabase();
