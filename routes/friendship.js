const express = require('express')
const router=express.Router()

const friendship_controllers=require('../controllers/friendship_controllers')


const passport = require('../config/passport-local-strategy')


router.post('/addfriend',passport.checkAuthentication,friendship_controllers.addfriend)

// router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy)

module.exports = router
