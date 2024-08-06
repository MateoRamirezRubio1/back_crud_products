const multer = require('multer');
const path = require('path');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

/**
 * Generates a unique file name by hashing the original name with a UUID.
 */
function generateUniqueFileName(originalName) {
    const uniqueId = uuidv4();
    const hash = md5(originalName + uniqueId);
    const hashedName = hash + path.extname(originalName);
    return hashedName;
}

const storage = multer.diskStorage({
    /**
     * Defines the destination folder for uploaded files.
     */
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    /**
     * Defines the file name for uploaded files.
     */
    filename: (req, file, cb) => {
        const hashName = generateUniqueFileName(file.originalname);
        cb(null, hashName)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;