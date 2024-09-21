const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Make sure the path to your db.js is correct

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // Model options can be set here
    tableName: 'users', // Optional: If your table name is not the plural form of 'User'
});

module.exports = User;
