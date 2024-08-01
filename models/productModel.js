const { raw } = require('express');
const db = require('../config/db');

const getAllProducts = async () => {
    try {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    } catch (error) {
        throw new Error(`Database error: Unable to retrieve products. ${error.message}`);
    }

};

const getProductById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error(`Produc with ID: ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Database error: Unable to retrieve product with ID: ${id}. ${error.message}`);
    }
};

const createProduct = async (product) => {
    try {
        const { name, price, description } = product;
        const result = await db.query(
            'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
            [name, price, description]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Database error: Unable to create product. ${error.message}`);
    }
};

const updateProduct = async (id, product) => {
    try {
        const { name, price, description } = product;
        const result = await db.query(
            'UPDATE products SET name = $1, price = $2, description = $3 where id = $4 RETURNING *',
            [name, price, description, id]
        );
        if (result.rows.length === 0) {
            throw new Error(`Produc with ID: ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Database error: Unable to update product with ID: ${id}. ${error.message}`);
    }
};

const deleteProduct = async (id) => {
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Database error: Unable to delete product with ID ${id}. ${error.message}`);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};