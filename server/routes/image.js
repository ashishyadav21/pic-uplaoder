const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const { uploadFile, getFileStream } = require('../s3')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



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


router.get('/:key', async (req, res) => {
    const key = req.params.Key;
    const readStream = getFileStream(key)

    readStream.pipe(res)

})

router.post('/', imageUpload.single('file'), async (req, res) => {
    const file = req.file
    const { filename, mimetype, size } = req.file;

    const s3Result = await uploadFile(req.file)



    if (s3Result) {
        console.log("s3Result -=--", s3Result)
        const imageResult = await prisma.images.create({
            data: {
                id: uuidv4(),
                filename: s3Result?.Key,
                filepath: file.path,
                mimetype: mimetype,
                size: size
            }
        })
        res.status(200).json({ "message": "Image inserted successfully", status: true, imagePath: `/images/${s3Result.Key}`, url: s3Result?.Location })

    } else {
        console.error('Error inserting image:', error);
        res.json({ success: false, message: 'upload failed', stack: error.stack });
    }
})

module.exports = router;