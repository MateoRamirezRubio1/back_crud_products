exports.success = (data) => ({
    status: 'success',
    data,
});

exports.error = (message, details = []) => ({
    status: 'error',
    message,
    details,
});