const express = require('express')
const router=express.Router()

const postsController = require('../controllers/posts_controllers')
const passport = require('../config/passport-local-strategy')


router.post('/create',passport.checkAuthentication,postsController.create)

module.exports = router
