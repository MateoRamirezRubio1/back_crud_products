const rateLimiter = require('express-rate-limit');

exports.apiLimiter = rateLimiter({
    windowMs: 14 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});