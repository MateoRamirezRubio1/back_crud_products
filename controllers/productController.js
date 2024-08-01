const productService = require('../services/productService');
const responseFormatter = require('../utils/responseFormatter');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(responseFormatter.success(products));
    } catch (error) {
        res.status(500).json(responseFormatter.error('Internal Server Error'));
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(responseFormatter.success(product));
    } catch (error) {
        res.status(500).json(responseFormatter.error('Internal Server Error'));
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return res.status(404).json(responseFormatter.error(`Product with ID ${req.params.id} not found`));
        }
        res.status(200).json(responseFormatter.success(product));
    } catch (error) {
        res.status(500).json(responseFormatter.error('Internal Server Error'));
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return res.status(404).json(responseFormatter.error(`Product with ID ${req.params.id} not found`));
        }
        res.status(204).json(responseFormatter.success('Product deleted successfully'));
    } catch (error) {
        res.status(500).json(responseFormatter.error('Internal Server Error'));
        next(error);
    }
};
