const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
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
    image: {
      type: DataTypes.STRING, // You can use DataTypes.STRING to store the URL or path of the image file
      allowNull: true, // Set to true if the image is optional, otherwise false
    },
    type:{
      type: DataTypes.ENUM('dog', 'cat', 'bird', 'other'),
      allowNull: false,
    },
    breed:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_seenLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       isEmail: true,
      },
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet',
  }
);

module.exports = Pet;