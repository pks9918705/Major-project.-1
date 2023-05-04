const express=require('express')

const router=express.Router()

//getting the controller
const user_controller = require('../controllers/users_controllers')


// this will open when you enter "http://localhost:8000/users/"
// router.get('/', user_controller.timepass)


router.get('/profile', user_controller.profile)

router.get('/sign-in', user_controller.signIn)
router.get('/sign-up', user_controller.signUp)

//posting form data
router.post('/create', user_controller.create)

module.exports=router