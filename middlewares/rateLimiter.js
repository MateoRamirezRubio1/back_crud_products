const rateLimiter = require('express-rate-limit');

/**
 * Rate limiter middleware to restrict the number of requests.
 * Limits requests to 10 per minute per IP address.
 */
exports.apiLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // Time window in milliseconds (1 minute)
    max: 10, // Maximum number of requests allowed per window
    message: 'Too many requests from this IP, please try again later.',
});