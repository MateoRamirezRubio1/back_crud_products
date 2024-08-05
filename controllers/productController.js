const productService = require('../services/productService');
const responseFormatter = require('../utils/responseFormatter');

/**
 * Handles GET requests to retrieve all products.
 */
exports.getAllProducts = async (req, res, next) => {
    console.log('Received GET request to retrieve all products');
    try {
        const products = await productService.getAllProducts();
        console.log('Products retrieved successfully');
        res.status(200).json(responseFormatter.success(products));
    } catch (error) {
        console.error('Error retrieving products:', error);
        next(error);
    }
};

/**
 * Handles GET requests to retrieve a specific product by ID.
 */
exports.getProductById = async (req, res, next) => {
    console.log(`Received GET request to retrieve product with ID: ${req.params.id}`);
    try {
        const product = await productService.getProductById(req.params.id);
        console.log(`Product with ID ${req.params.id} retrieved successfully:`, product);
        res.status(200).json(responseFormatter.success(product));
    } catch (error) {
        console.error(`Error retrieving product with ID ${req.params.id}:`, error);
        next(error);
    }
};

/**
 * Handles POST requests to create a new product.
 */
exports.createProduct = async (req, res, next) => {
    console.log('Received POST request to create a new product with data');
    try {
        const image_path = req.file ? req.file.filename : null;
        console.log('Image path:', image_path);
        const newProduct = await productService.createProduct(req.body, image_path);
        console.log('New product created successfully:', newProduct);
        res.status(201).json(responseFormatter.success(newProduct));
    } catch (error) {
        console.error('Error creating new product:', error);
        next(error);
    }
};

/**
 * Handles PUT requests to update an existing product.
 */
exports.updateProduct = async (req, res, next) => {
    console.log(`Received PUT request to update product with ID: ${req.params.id}`);
    try {
        const image_path = req.file ? req.file.filename : null;
        console.log('Image path:', image_path);
        const updatedProduct = await productService.updateProduct(req.params.id, req.body, image_path);
        console.log(`Product with ID ${req.params.id} updated successfully:`, updatedProduct);
        res.status(200).json(responseFormatter.success(updatedProduct));
    } catch (error) {
        console.error(`Error updating product with ID ${req.params.id}:`, error);
        next(error);
    }
};

/**
 * Handle DELETE request to remove a product by ID.
 */
exports.deleteProduct = async (req, res, next) => {
    console.log(`Received DELETE request to remove product with ID: ${req.params.id}`);
    try {
        await productService.deleteProduct(req.params.id);
        console.log(`Product with ID ${req.params.id} deleted successfully`);
        res.status(204).json(responseFormatter.success('Product deleted successfully'));
    } catch (error) {
        console.error(`Error deleting product with ID ${req.params.id}:`, error);
        next(error);
    }
};

