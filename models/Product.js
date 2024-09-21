const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    imageUrl: DataTypes.STRING
});
Product.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'SET NULL' });

module.exports = Product;
