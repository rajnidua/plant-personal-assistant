const User = require('./User');
const Plant = require('./Plant');
const Category = require('./Category');
//const Frequency = require('./Frequency');
const Location = require('./Location');

// User to Plant

User.hasMany(Plant, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(User, {
  foreignKey: 'owner_id',
});

// User to Location

User.hasMany(Location, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Location.belongsTo(User, {
  foreignKey: 'owner_id',
});

// User to Category

User.hasMany(Category, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Category.belongsTo(User, {
  foreignKey: 'owner_id',
});
/* // User to Frequency

User.hasMany(Frequency, {
  foreignKey: 'owner_id',
  onDelete: 'CASCADE',
});

Frequency.belongsTo(User, {
  foreignKey: 'owner_id',
}); */

// Category to Plant

Category.hasMany(Plant, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Location to Plant
Location.hasMany(Plant, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(Location, {
  foreignKey: 'location_id',
});

/* // Frequency to Plant

Frequency.hasMany(Plant, {
  foreignKey: 'frequency_id',
  onDelete: 'CASCADE',
});

Plant.belongsTo(Frequency, {
  foreignKey: 'frequency_id',
}); */

//module.exports = { User, Plant, Category, Location, Frequency };
module.exports = { User, Plant, Category, Location };
