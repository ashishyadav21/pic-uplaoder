const { v4: uuidv4 } = require('uuid');
const zod = require('zod');
var jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createCommentSchema = zod.object({
    postId: zod.string(),
    text: zod.string(),
    updatedAt: zod.string(),
    createdAt: zod.string()
})

exports.postAComment = async (req, res) => {
    const token = req.header("x-auth-token");
    const response = createCommentSchema.safeParse(req.body)
    const { data } = response

    if (!token)
        return res.status(401).json({
            success: false,
            result: null,
            message: "No authentication token, authorization denied.",
            jwtExpired: true,
        });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
        return res.status(401).json({
            success: false,
            result: null,
            message: "Token verification failed, authorization denied.",
            jwtExpired: true,
        });

    const username = verified.username

    const userDetail = await prisma.users.findUnique({
        where: {
            username: username,
        },
        select: {
            id: true,
        },
    })

    const result = await prisma.comments.create({
        data: {
            ...data,
            id: uuidv4(),
            userId: userDetail.id,
        }
    })

    res.status(200).json({
        "message": 'comment posted successfully', comment: {
            ...result, username: username
        }
    })
}