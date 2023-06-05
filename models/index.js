const User = require('./user');
const Pet = require('./pets');
const Status = require('./status');
const Notification = require('./notifications');

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Notification, {
  foreignKey: 'pet_owner',
  onDelete: 'CASCADE',
});

User.hasMany(Status, {
  foreignKey: 'user_id',
});

Pet.hasMany(Status, {
  foreignKey: 'pet_id',
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

Status.belongsTo(User, {
  foreignKey: 'user_id'
});

Status.belongsTo(Pet, {
  foreignKey: 'pet_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Pet, Notification, Status };