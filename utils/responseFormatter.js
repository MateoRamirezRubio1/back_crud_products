exports.success = (data) => {
    return { success: true, data };
};

exports.error = (message) => {
    return { succes: false, error: message };
};