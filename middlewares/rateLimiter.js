const rateLimiter = require('express-rate-limit');

exports.apiLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again later.',
});