const express=require('express');

const router=express.Router()

                            //! Route index for api folder

//? router for version 1 
router.use('/v1',require('./v1'))


module.exports =router;
