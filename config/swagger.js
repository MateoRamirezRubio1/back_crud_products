const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration for Swagger API documentation
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'API to manage products',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1', // Base URL for the API
                description: 'Development server', // Server description
            },
        ],
    },
    apis: ['./routers/*.js'], // Path to the API route files for documentation
};

// Generate Swagger specification
const specs = swaggerJsdoc(options);

// Middleware to serve Swagger API docs
const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerDocs;
