const router = require('express').Router();
const productController = require('../Controllers/productController');
const productCheck = require('../Middlewares/productCheck');
const checkRole = require('../Middlewares/checkRole');
const verifyToken = require('../Middlewares/verifyToken');

// Create
router.post('/', verifyToken, checkRole.checkAdmin, productCheck.existingProduct, productController.createProduct);

// Get AllProduct
router.get('/', verifyToken, productController.allProducts);

// Get Product ID
router.get('/:id', verifyToken, productController.getProductByID);

// Up Date Product
router.put('/:id', verifyToken, checkRole.checkAdmin, productCheck.checkIdProduct, productController.updateProduct);
router.patch('/:id', verifyToken, checkRole.checkAdmin, productCheck.checkIdProduct, productController.updateProduct);

// Delete Product
router.delete('/:id', verifyToken, checkRole.checkAdmin, productController.deleteProduct);

module.exports = router;