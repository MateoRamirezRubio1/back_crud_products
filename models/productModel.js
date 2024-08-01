const db = require('../config/db')

const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products')
    return result.rows;
};

module.exports = {
    getAllProducts,
};