const { body, param, validationResult } = require('express-validator');

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