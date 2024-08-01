const productService = require('../services/productService');
const responseFormatter = require('../utils/responseFormatter');

/**
 * Handles GET requests to retrieve all products.
 */
exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(responseFormatter.success(products));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles GET requests to retrieve a specific product by ID.
 */
exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(responseFormatter.success(product));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles POST requests to create a new product.
 */
exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(responseFormatter.success(newProduct));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles PUT requests to update an existing product.
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(responseFormatter.success(updatedProduct));
    } catch (error) {
        next(error);
    }
};

/**
 * Handle DELETE request to remove a product by ID.
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).json(responseFormatter.success('Product deleted successfully'));
    } catch (error) {
        next(error);
    }
};
