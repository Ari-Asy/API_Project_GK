const router = require('express').Router();
const productController = require('../Controllers/productController');

// Create
router.post('/', productController.createProduct);

// Get AllProduct
router.get('/', productController.allProducts);

// Get Product ID
router.get('/:id', productController.getProductByID);

// Up Date Product
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);

// Delete Product
router.delete('/:id', productController.deleteProduct);

module.exports = router;