const productModel = require('../models/productModel');

/**
 * Retrieve all products through the model.
 */
exports.getAllProducts = async () => {
    try {
        return await productModel.getAllProducts();
    } catch (error) {
        throw new Error('Unable to fetch products');
    }
};

/**
 * Retrieve a specific product by ID.
 */
exports.getProductById = async (id) => {
    try {
        const product = await productModel.getProductById(id);
        if (!product) {
            const error = new Error(`Product with ID ${id} not found`);
            error.statusCode = 404;
            error.isOperational = true;
            throw error;
        }
        return product;
    } catch (error) {
        throw error;
    }
};

/**
 * Create a new product using the model.
 */
exports.createProduct = async (productData) => {
    try {
        return await productModel.createProduct(productData);
    } catch (error) {
        throw new Error(`Unable to create product'`);
    }
};

/**
 * Update an existing product by ID.
 */
exports.updateProduct = async (id, productData) => {
    try {
        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            const error = new Error(`Product with ID ${id} not found`);
            error.statusCode = 404;
            error.isOperational = true;
            throw error;
        }
        return await productModel.updateProduct(existingProduct.id, productData);
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a product by ID.
 */
exports.deleteProduct = async (id) => {
    try {
        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            const error = new Error(`Product with ID ${id} not found`);
            error.statusCode = 404;
            error.isOperational = true;
            throw error;
        }
        return await productModel.deleteProduct(existingProduct.id);
    } catch (error) {
        throw error;
    }
};