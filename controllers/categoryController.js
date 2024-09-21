const Category = require('../models/Category');
const { Op } = require("sequelize");

// Create a new category
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const category = await Category.create({ name, description });
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

// Get all categories with pagination and sorting
exports.getCategories = async (req, res, next) => {
    search = req.query.search ?? '';
    page = req.query.page ?? 1;
    per_page = req.query.per_page ?? 10;
    try {
        const categories = await Category.findAndCountAll({
            where: { 'name': { [Op.like]: `%${search}%` } },
            order: [['name', 'ASC']],
            limit: parseInt(per_page),
            offset: (page - 1) * per_page,
        });
        return res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ message: 'Error fetching data', error: error.message });
    }

};

// Get a single category by ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Update category
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        const { name, description } = req.body;
        category.name = name || category.name;
        category.description = description || category.description;
        await category.save();

        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.destroy();
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};
