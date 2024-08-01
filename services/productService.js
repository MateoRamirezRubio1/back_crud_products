const productModel = require('../models/productModel');

const getAllProducts = async () => {
    try {
        return await productModel.getAllProducts();
    } catch (error) {
        throw new Error(`Service error: Unable to retrieve products. ${error.message}`);
    }
};

const createProduct = async (product) => {
    try {
        return await productModel.createProduct(product);
    } catch (error) {
        throw new Error(`Service error: Unable to create product. ${error.message}`);
    }
};

const updateProduct = async (id, product) => {
    try {
        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return await productModel.updateProduct(id, product);
    } catch (error) {
        throw new Error(`Service error: Unable to update product with ID ${id}. ${error.message}`);
    }
};

const deleteProduct = async (id) => {
    try {
        const existingProduct = await productModel.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found`);
        }
        await productModel.deleteProduct(id);
        return existingProduct;
    } catch (error) {
        throw new Error(`Service error: Unable to delete product with ID ${id}. ${error.message}`);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};