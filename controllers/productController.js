const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
};