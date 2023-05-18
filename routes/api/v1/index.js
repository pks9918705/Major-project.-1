//! Route index for "v1" folder


const express = require('express');

const router = express.Router()


router.use('/posts',require('./posts'))

module.exports =router;