const { body, param, validationResult } = require('express-validator');

/**
 * Validation middleware for product creation and update.
 * Validates the request body to ensure it meets the criteria for name, price, and optional description.
 */
exports.validateProduct = [
    body('name').isString().trim().escape(),
    body('price').isFloat({ gt: 0 }),
    body('description').optional().isString().trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/**
 * Validation middleware for validating product ID in request parameters.
 * Ensures 'id' is an integer.
 */
exports.validateProductId = [
    param('id').isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];