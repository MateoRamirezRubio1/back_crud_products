const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, validateProductId } = require('../middlewares/validator');
const { apiLimiter } = require('../middlewares/rateLimiter');

router.use(apiLimiter);

router.get('/products', productController.getProducts);
router.post('/products', validateProduct, productController.createProduct);
router.put('/products/:id', validateProductId, validateProduct, productController.updateProduct);
router.delete('/products/:id', validateProductId, productController.deleteProduct);

module.exports = router;