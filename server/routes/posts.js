var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const zod = require('zod');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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

/* GET home page. */
router.post('/', async (req, res) => {
    console.log("req --->", req.body)
    const response = postCreateSchema.safeParse(req.body)
    console.log("response  -->", response)
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

    console.log("result --->", result)
    res.status(200).json({
        "message": 'post Created successfully',
        "post": result
    })
});

router.post('/like', async (req, res) => {
    console.log("req --->", req.body)
    const response = postLikeSchema.safeParse(req.body)
    console.log("response  -->", response)
    const { data } = response

    const result = await prisma.likes.create({
        data: {
            id: uuidv4(),
            userId: data?.userId,
            createdAt: data?.createdAt,
            postId: data?.postId,
        }
    })

    console.log("result --->", result)
    res.status(200).json({
        "message": 'post Created successfully',
        "post": result
    })
});

module.exports = router;
