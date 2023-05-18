//! posts of v2
const express = require('express');

const router = express.Router()

//getting controller for v2
const postsApi=require('../../../controllers/api/v2/posts_api')

router.get('/',postsApi.getPosts);   


module.exports =router;