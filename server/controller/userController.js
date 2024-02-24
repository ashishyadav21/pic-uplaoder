const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const zod = require('zod');
var jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createUserSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  dateofbirth: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string()
});

const updateUserSchema = zod.object({
  username: zod.string(),
  password: zod.string().optional(),
  dateofbirth: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  email: zod.string().optional(),
  imageUrl: zod.string().optional()
});


const signinUserSchema = zod.object({
  username: zod.string(),
  password: zod.string()
});

const numberSchema = zod.string();

exports.userRegister = async (req, res) => {

  const response = createUserSchema.safeParse(req.body);
  const { data } = response

  var ciphertext = CryptoJS.AES.encrypt(data?.password, 'secret key 123').toString();

  if (!response.success) {
    return res.status(400).json({ message: 'Invalid request data', success: false });
  }

  const existingUser = await prisma.users.findUnique({
    where: {
      username: data.username,
    },
    select: {
      username: true,
    }
  });


  if (existingUser) {
    return res.status(400).json({ error: 'User with this username already exists' });
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      username: response.data.username,
    },
    process.env.JWT_SECRET
  );

  const result = await prisma.users.create({
    data: {
      username: data.username,
      password: ciphertext,
      dateofbirth: data.dateofbirth,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      id: uuidv4()
    }
  });


  if (result) {
    res.status(201).json({
      result: {
        token,
        user: result,
      }, message: 'User created successfully', success: true
    });

  } else {
    return res.status(404).json({
      "message": "User is not able to created"
    })
  }
}

exports.login = async (req, res) => {
  const response = signinUserSchema.safeParse(req.body);

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      username: response.data.username,
    },
    process.env.JWT_SECRET
  );

  const user = await prisma.users.findUnique({
    where: {
      username: response?.data?.username
    }
  })

  if (user) {
    var bytes = CryptoJS.AES.decrypt(user.password, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText.toLowerCase() === response.data.password.toLowerCase()) {
      res.status(200).json({
        success: true,
        result: {
          token,
          user: {
            name: user,
            isLoggedIn: true,
          },
        },
        message: "Successfully login",
      })
    }
  } else {
    res.status(200).json({ message: "user is not exist in db." })
  }

}

exports.getAllUser = async (req, res) => {

  const allUsers = await prisma.users.findMany()
  if (allUsers) {
    res.status(201).json({ allUsers, message: 'All Users get successfully', success: true });
  } else {
    res.status(500).json({ "message": "not able to get all users" })
  }
}

exports.getUserDetail = async (req, res) => {
  const request = numberSchema.safeParse(req.params.userId)

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


  const existingUser = await prisma.users.findUnique({
    where: {
      id: request.data,
    }
  });

  if (existingUser) {
    res.status(200).json({ existingUser, message: 'User details', success: true });
  } else {
    return res.status(404).json({ message: 'User not sfound', success: false });
  }
}

exports.updateUserProfile = async (req, res) => {
  const token = req.header("x-auth-token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const username = decoded.username
  console.log(username)

  const response = updateUserSchema.safeParse(req.body)
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

  const updateUser = await prisma.users.update({
    where: {
      username: username,
    },
    data: {
      ...data
    },
  })

  res.status(200).json({ "message": "User Updated Successfully", user: updateUser })
}