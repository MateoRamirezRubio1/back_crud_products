const { raw } = require('express');
const db = require('../config/db');

exports.getAllProducts = async () => {
    try {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while retrieving products.`);
    }

};

exports.getProductById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while retrieving product.`);
    }
};

exports.createProduct = async (product) => {
    try {
        const { name, price, description } = product;
        const result = await db.query(
            'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
            [name, price, description]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while creating product.`);
    }
};

exports.updateProduct = async (id, product) => {
    try {
        const { name, price, description } = product;
        const result = await db.query(
            'UPDATE products SET name = $1, price = $2, description = $3 where id = $4 RETURNING *',
            [name, price, description, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while updating product.`);
    }
};

exports.deleteProduct = async (id) => {
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while deleting product.`);
    }
};