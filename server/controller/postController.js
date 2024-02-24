const { v4: uuidv4 } = require('uuid');
const zod = require('zod');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken');

const postCreateSchema = zod.object({
    caption: zod.string(),
    createdAt: zod.string(),
    userId: zod.string(),
    image_url: zod.string().optional(),
    location: zod.string().optional(),
    updatedAt: zod.string()
});

const postLikeSchema = zod.object({
    userId: zod.string(),
    postId: zod.string(),
    createdAt: zod.string()
})


exports.createPost = async (req, res) => {
    const token = req.header("x-auth-token");

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

    const response = postCreateSchema.safeParse(req.body)
    const { data } = response

    const result = await prisma.posts.create({
        data: {
            id: uuidv4(),
            userId: data?.userId,
            caption: data?.caption,
            createdAt: data?.createdAt,
            image_url: data?.image_url,
            location: data?.location,
            updatedAt: data?.updatedAt
        }
    })

    res.status(200).json({
        "message": 'post Created successfully',
        "post": result
    })
}

exports.postLike = async (req, res) => {

    const token = req.header("x-auth-token");

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


    const response = postLikeSchema.safeParse(req.body)
    const { data } = response

    const result = await prisma.likes.create({
        data: {
            id: uuidv4(),
            userId: data?.userId,
            createdAt: data?.createdAt,
            postId: data?.postId,
        }
    })

    res.status(200).json({
        "message": 'post Created successfully',
        "post": result
    })
}

exports.getPost = async (req, res) => {
    const token = req.header("x-auth-token");
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

    const posts = await prisma.posts.findMany({
        include: {
            likes: true,
            comments: true
        },
    });

    res.status(200).json({ "message": "all post", posts: posts })

}