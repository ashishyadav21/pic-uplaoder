const express = require('express');

const router = express.Router();
const multer = require('multer');

const { uploadImage, getImage } = require('../controller/imageUploadController');
const { catchErrors } = require('../handlers/errorHandler');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const storage = multer.memoryStorage();

const imageUpload = multer({
    storage,
    fileFilter,
});

router.route('/:key').get(catchErrors(getImage))

router.route('/').post(imageUpload.single('file'), catchErrors(uploadImage))

module.exports = router;