const multer = require('multer');
const path = require('path');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

function generateUniqueFileName(originalName) {
    const uniqueId = uuidv4();
    const hash = md5(originalName + uniqueId);

    const hashedName = hash + path.extname(originalName);
    return hashedName;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        const hashName = generateUniqueFileName(file.originalname);
        cb(null, hashName)
    }
});

const upload = multer({ storage: storage });

module.exports = upload;