// Entry point for all my Routes

const express=require('express');

const router=express.Router()

const homeController=require('../controllers/home_controllers')



console.log("router loaded")


router.get('/', homeController.home)


module.exports=router
// module.exports generally do the same thing as exports=router but here there is a difference
