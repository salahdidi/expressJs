// controllers/productController.js
const Product = require('../models/product');
const exportService = require('../services/exportService');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");

// Create a new product
const createProduct = async (req, res) => {

    await check('name').not().isEmpty().withMessage('Name is required').run(req);
    await check('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number').run(req);
    await check('description').optional().isString().withMessage('Description must be a string').run(req);

    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, price, description } = req.body;
        const newProduct = await Product.create({ name, price, description });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        search = req.query.search;
        page = req.query.page;
        per_page = req.query.per_page;
        const products = await Product.findAll({
            where: { 'name': { [Op.like]: `%${search}%` } },
            order: [['name', 'ASC']],
            offset: (page - 1) * per_page,
            limit: parseInt(per_page), // Limit to per_page
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const [updated] = await Product.update({ name, price, description }, { where: { id } });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

const exportProductsToPDF = async (req, res) => {
    const products = await Product.findAll();
    await exportService.exportProductsToPDF(products, res);
};

const exportProductsToExcel = async (req, res) => {
    const products = await Product.findAll();
    await exportService.exportProductsToExcel(products, res);
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    exportProductsToPDF,
    exportProductsToExcel,
};
