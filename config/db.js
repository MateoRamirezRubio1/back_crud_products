const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool of connections to the PostgreSQL database
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;
