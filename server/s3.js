const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const fs = require('fs')

const s3 = new S3({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

})

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
    // return s3.upload(uploadParams).promise()
}



exports.uploadFile = uploadFile
exports.getFile = getFileStream





// download file from s3