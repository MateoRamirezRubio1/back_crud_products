const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const swaggerDocs = require('./config/swagger');
const productRoutes = require('./routers/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

// To accept requests from others devices
app.use(cors());

// Security middleware to set various HTTP headers
app.use(helmet());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route when it can be obtained product images
app.use('/uploads/images', express.static('uploads/images'));

// Route handling for product-related endpoints
app.use('/api/v1', productRoutes);

// Error handling middleware should be defined after all routes
app.use(errorHandler);

// Swagger documentation setup
swaggerDocs(app);

// Start the server and listen on the specified port
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});