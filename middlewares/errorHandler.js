const responseFormatter = require('../utils/responseFormatter');

module.exports = (err, req, res, next) => {
    console.error(err.stack);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];

    res.status(statusCode).json(responseFormatter.error(message, errors));
};
