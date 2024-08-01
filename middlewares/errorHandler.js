const responseFormatter = require('../utils/responseFormatter');

/**
 * Express middleware for handling errors.
 * Logs the error stack and responds with a formatted error message.
 */
module.exports = (err, req, res, next) => {
    // Log the error stack to the console
    console.error(err.stack);

    // If headers are already sent, delegate to the default error handler
    if (res.headersSent) {
        return next(err);
    }

    // Determine the status code and message to send
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];

    // Send the error response with the appropriate status code and message
    res.status(statusCode).json(responseFormatter.error(message, errors));
};
