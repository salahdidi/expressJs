const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const authenticateToken = require('../middleware/authenticate');
const fileService = require('../services/fileService');

// Product CRUD routes
router.post('/', authenticateToken, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

// Export products
router.get('/export/pdf', productController.exportProductsToPDF);
router.get('/export/excel', productController.exportProductsToExcel);

module.exports = router;


// router.get('/export/pdf', async (req, res, next) => {
//     const products = await productController.getProducts(); // Get all products
//     await exportService.exportProductsToPDF(products, res);
// });

// router.get('/export/excel', async (req, res, next) => {
//     const products = await productController.getProducts();
//     await exportService.exportProductsToExcel(products, res);
// });



router.post('/products/:id/upload-image', fileService.single('image'), async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.imageUrl = req.file.path;
    await product.save();
    res.status(200).json(product);
});


module.exports = router;
