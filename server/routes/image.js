const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const multer = require('multer');
const { s3UploadV3, getObjectFromS3 } = require('../s3')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


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


router.get('/:key', async (req, res) => {
    const { key } = req.params;
    const result = await getObjectFromS3(key)
    return res.status(200).json({ imageUrl: result })
}
)

router.post('/', imageUpload.single('file'), async (req, res) => {
    const { mimetype, size } = req.file;

    const s3Result = await s3UploadV3(req.file)
    const currentYear = new Date().getFullYear()

    if (s3Result) {
        const imageResult = await prisma.images.create({
            data: {
                id: uuidv4(),
                filepath: s3Result.key,
                mimetype: mimetype,
                size: size,
                filename: "file.originalname",
                createdAt: new Date(currentYear, 6, 1).toISOString()

            }
        })

        res.status(200).json({
            "message": "Image inserted successfully", status: true, imageResult: { ...imageResult, size: imageResult.size.toString() }
        })

    } else {
        console.error('Error inserting image:', error);
        res.json({ success: false, message: 'upload failed', stack: error.stack });
    }
})

module.exports = router;