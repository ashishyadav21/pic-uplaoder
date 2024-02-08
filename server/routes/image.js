const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config');
const multer = require('multer');

const imageUpload = multer({
    dest: 'images',
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Image Upload Routes
router.post('/', upload.single('file'), (req, res) => {
    console.log("req----<", req.file)
    const { filename, mimetype, size } = req.file;
    console.log("filename --->", filename, mimetype, size)
    const filepath = req.file.path;
    console.log("filepath --->", filepath)

    const insertQuery = 'INSERT INTO images (id, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [uuidv4(), filename, filepath, mimetype, size];


    pool.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error('Error inserting image:', error);
            res.json({ success: false, message: 'upload failed', stack: error.stack });
        } else {
            const insertedImage = result.rows[0];
            console.log('Image inserted successfully:', insertedImage);
            res.status(201).json({
                success: true,
                filename
            });

        }
    })
});

module.exports = router;
