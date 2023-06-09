// Entry point for all my Routes

const express=require('express');

const router=express.Router()
                                 //! Route index for "routes" folder

//adding controllers
const homeController=require('../controllers/home_controllers')
 
console.log("router loaded")
 
//GET
router.get('/', homeController.home)
 
//Connecting new file
router.use('/users', require('./users'))
//foR creating new post
router.use('/posts', require('./posts'))

router.use('/comments', require('./comments'))

// router.use('/posts',require('./posts'))


router.use('/api', require('./api'))

// router for likes.js
router.use('/likes', require('./likes'))

router.use('/friend',require('./friendship'))


//for any other routes access from here
// router.use('/routerName',require('./routerFilename'));
 
module.exports=router
// module.exports generally do the same thing as exports=router but here there is a difference
