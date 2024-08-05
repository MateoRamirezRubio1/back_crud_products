const productModel = require('../models/productModel');
const fs = require('fs');
const path = require('path');

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
        // product.imageUrl = `${process.env.BASE_URL}/uploads/images/${product.image_path}`;
        return product;
    } catch (error) {
        throw error;
    }
};

/**
 * Create a new product using the model.
 */
exports.createProduct = async (productData, image_path) => {
    try {
        if (image_path) {
            productData.image_path = image_path;
        }
        return await productModel.createProduct(productData);
    } catch (error) {
        throw new Error(`Unable to create product'`);
    }
};


/**
 * Delete a image from directory
 */
const deleteImage = (imageName) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '..', 'uploads', 'images', imageName);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.log('Error deleting the image: ', err);
                return reject(new Error('Failed to delete image'));
            }
            resolve('Image deleted succesfully');
        });
    });
};

/**
 * Update an existing product by ID.
 */
exports.updateProduct = async (id, productData, image_path) => {
    try {
        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            const error = new Error(`Product with ID ${id} not found`);
            error.statusCode = 404;
            error.isOperational = true;
            throw error;
        }
        if (image_path) {
            if (existingProduct.image_path) {
                await deleteImage(existingProduct.image_path);
            }
            productData.image_path = image_path;
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

        if (existingProduct.image_path) {
            await deleteImage(existingProduct.image_path);
        }

        return await productModel.deleteProduct(existingProduct.id);
    } catch (error) {
        throw error;
    }
};