const { v4: uuidv4 } = require('uuid');

const { s3UploadV3, getObjectFromS3 } = require('../s3')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


exports.uploadImage = async (req, res) => {
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
}

exports.getImage = async (req, res) => {
    const { key } = req.params;
    const result = await getObjectFromS3(key)
    return res.status(200).json({ imageUrl: result })
}