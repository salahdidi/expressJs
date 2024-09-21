const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');


const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: DataTypes.TEXT
});

module.exports = Category;
