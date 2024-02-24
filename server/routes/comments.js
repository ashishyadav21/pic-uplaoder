const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandler');
const { postAComment } = require('../controller/commentController')

router.route('/').post(catchErrors(postAComment))

module.exports = router;
