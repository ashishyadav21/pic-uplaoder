const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

})

const s3UploadV3 = async (file) => {

    const key = `uploads/${uuidv4()} - ${file.originalname}`

    const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        ContentType: 'image/jpeg',
        Key: key
    }

    console.log("uploadParams----<", uploadParams)
    const resultOutput = await s3Client.send(new PutObjectCommand(uploadParams))
    console.log("resultOutput ----<", resultOutput)



    return { resultOutput, key: key }
}

const getObjectFromS3 = async (objectKey) => {

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return url
};


/* 


Below two function to upload on S3 is using AWS version 2
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey) {
    const fileStream = fs.createReadStream(file.path)

    const downloadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.getObject(downloadParams).createReadStream()
}

*/

exports.s3UploadV3 = s3UploadV3
exports.getObjectFromS3 = getObjectFromS3