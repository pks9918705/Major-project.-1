const express = require('express')
const router=express.Router()

const commentsController = require('../controllers/comments_controllers')
const passport = require('../config/passport-local-strategy')


router.post('/create',passport.checkAuthentication,commentsController.create)

module.exports = router
