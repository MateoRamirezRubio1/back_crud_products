/**
 * Formats a successful response.
 */
exports.success = (data) => ({
    status: 'success',
    data,
});

/**
 * Formats an error response.
 */
exports.error = (message, details = []) => ({
    status: 'error',
    message,
    details,
});