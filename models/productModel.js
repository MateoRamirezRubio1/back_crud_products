const db = require('../config/db');

/**
 * Retrieve all products from the database.
 */
exports.getAllProducts = async () => {
    try {
        const result = await db.query('SELECT * FROM products');
        return result.rows;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while retrieving products.`);
    }

};

/**
 * Retrieve a specific product by ID from the database.
 */
exports.getProductById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while retrieving product.`);
    }
};

/**
 * Create a new product in the database.
 */
exports.createProduct = async (product) => {
    try {
        const { name, price, description, image_path } = product;
        const result = await db.query(
            'INSERT INTO products (name, price, description, image_path) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, image_path]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while creating product.`);
    }
};

/**
 * Update an existing product in the database.
 */
exports.updateProduct = async (id, product) => {
    try {
        const { name, price, description, image_path } = product;
        const result = await db.query(
            'UPDATE products SET name = $1, price = $2, description = $3, image_path = $4 where id = $5 RETURNING *',
            [name, price, description, image_path, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while updating product.`);
    }
};

/**
 * Delete a product from the database.
 */
exports.deleteProduct = async (id) => {
    try {
        const result = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error(`Database error while deleting product.`);
    }
};