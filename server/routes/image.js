const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../config');
const multer = require('multer');
const { uploadFile } = require('../s3')




const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const imageUpload = multer({
    dest: 'images',
    fileFilter: fileFilter
});

const upload = multer({ storage: '/dist', });

// Image Upload Routes
// router.post('/', imageUpload.single('file'), async (req, res) => {
//     console.log("req----<", req.file)
//     const { filename, mimetype, size } = req.file;
//     console.log("filename --->", filename, mimetype, size)
//     const filepath = req.file.path;
//     console.log("filepath --->", filepath)

//     const insertQuery = 'INSERT INTO images (id, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *';
//     const values = [uuidv4(), filename, filepath, mimetype, size];


//     const s3Result = await uploadFile(req.file)
//     console.log("s3Result -=--", s3Result)


//     // pool.query(insertQuery, values, async (error, result) => {
//     //     if (error) {
//     //         console.error('Error inserting image:', error);
//     //         res.json({ success: false, message: 'upload failed', stack: error.stack });
//     //     } else {
//     //         const insertedImage = result.rows[0];
//     //         console.log('Image inserted successfully:', insertedImage);
//     //         const s3Result = await uploadFile(req.file)
//     //         console.log("s3Result -=--", s3Result)
//     //         res.status(201).json({
//     //             success: true,
//     //             filename
//     //         });

//     //     }
//     // })
// });


router.post('/', imageUpload.single('file'), async (req, res) => {
    const file = req.file
    console.log("req.file ---->", req.file)
    console.log("file --->", file)

    const { filename, mimetype, size } = req.file;

    const result = await uploadFile(file)
    // await unlinkFile(file.path)
    console.log("result ---->", result)

    const insertQuery = 'INSERT INTO images (id, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [uuidv4(), result?.Key, file.path, mimetype, size];

    pool.query(insertQuery, values, async (error, result) => {
        if (error) {
            console.error('Error inserting image:', error);
            res.json({ success: false, message: 'upload failed', stack: error.stack });
        } else {
            const insertedImage = result.rows[0];
            console.log('Image inserted successfully:', insertedImage);
            // const s3Result = await uploadFile(req.file)
            // console.log("s3Result -=--", s3Result)
            // res.status(201).json({
            //     success: true,
            //     filename
            // });

        }
    })
    const description = req.body.description
    res.send({ imagePath: `/images/${result.Key}` })
})

module.exports = router;