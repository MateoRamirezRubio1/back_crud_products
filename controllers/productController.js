const productService = require('../services/productService');
const responseFormatter = require('../utils/responseFormatter');

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(responseFormatter.success(products));
    } catch (error) {
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(responseFormatter.success(product));
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(responseFormatter.success(newProduct));
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(responseFormatter.success(updatedProduct));
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).json(responseFormatter.success('Product deleted successfully'));
    } catch (error) {
        next(error);
    }
};
