const router = require('express').Router();
const productController = require('../Controllers/productController');
const productCheck = require('./productCheck');

// Create
router.post('/', productCheck.existingProduct, productController.createProduct);

// Get AllProduct
router.get('/', productController.allProducts);

// Get Product ID
router.get('/:id', productController.getProductByID);

// Up Date Product
router.put('/:id', productCheck.checkIdProduct, productController.updateProduct);
router.patch('/:id', productCheck.checkIdProduct, productController.updateProduct);

// Delete Product
router.delete('/:id', productController.deleteProduct);

module.exports = router;