const express=require('express')

const router=express.Router()

const passport = require('passport')
// const passportLocal=require('passport-local')


//getting the controller
const user_controller = require('../controllers/users_controllers')


// this will open when you enter "http://localhost:8000/users/"
// router.get('/', user_controller.timepass)


router.get('/profile', passport.checkAuthentication, user_controller.profile)

router.get('/sign-in', user_controller.signIn)
router.get('/sign-up', user_controller.signUp)

//posting form data
router.post('/create', user_controller.create)

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
) ,user_controller.createSession)
//if passport.authenticate works then user_controller.createSession is called as callback fxn
// here 3 arguments in .post , middleware is in middle 
//passport is used as middleware to authenticate

router.get('/sign-out', user_controller.destroySession)

module.exports=router