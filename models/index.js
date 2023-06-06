const User = require('./user');
const Pet = require('./pets');
const Notification = require('./notifications');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Notification, {
  foreignKey: 'pet_owner',
  onDelete: 'CASCADE',
});

Pet.hasOne(Notification, {
  foreignKey: 'pet_id',
});

Pet.belongsTo(User, {
  foreignKey: 'user_id',
});

Notification.belongsTo(User, {
  foreignKey: 'pet_owner',
});

Notification.belongsTo(Pet, {
  foreignKey: 'pet_id',
});


module.exports = { User, Pet, Notification };