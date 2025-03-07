/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Test Product
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 99.99
 *                   description:
 *                     type: string
 *                     example: This is a test product
 *                   imageUrl:
 *                     type: string
 *                     format: uri
 *                     example: http://localhost:3000/uploads/unique-image-hash.png
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Product
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 example: This is a new product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: New Product
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 29.99
 *                 description:
 *                   type: string
 *                   example: This is a new product
 *                 image_path:
 *                   type: string
 *                   example: 123e4567-e89b-12d3-a456-426614174000.png
 * /products/{id}:
 *   get:
 *     summary: Get a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Test Product
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 99.99
 *                 description:
 *                   type: string
 *                   example: This is a test product
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                   example: http://localhost:3000/uploads/unique-image-hash.png
 *       404:
 *         description: Product not found
 *   put:
 *     summary: Update an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Product
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 89.99
 *               description:
 *                 type: string
 *                 example: This is an updated test product
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Updated product image
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Updated Product
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 89.99
 *                 description:
 *                   type: string
 *                   example: This is an updated test product
 *                 imageUrl:
 *                   type: string
 *                   format: uri
 *                   example: http://localhost:3000/uploads/updated-image-hash.png
 *       404:
 *         description: Product not found
 *   delete:
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, validateProductId } = require('../middlewares/validator');
const upload = require('../middlewares/uploadMiddleware');
const { apiLimiter } = require('../middlewares/rateLimiter');

// Apply rate limiter middleware to all routes in this file
router.use(apiLimiter);

/**
 * Route to get all products.
 */
router.get('/products', productController.getAllProducts);

/**
 * Route to get a specific product by ID.
 */
router.get('/products/:id', validateProductId, productController.getProductById);

/**
 * Route to create a new product.
 */
router.post('/products', upload.single('image'), validateProduct, productController.createProduct);

/**
 * Route to update an existing product.
 */
router.put('/products/:id', upload.single('image'), validateProductId, validateProduct, productController.updateProduct);

/**
 * Route to delete a product.
 */
router.delete('/products/:id', validateProductId, productController.deleteProduct);

module.exports = router; // Export the router for use in the main app