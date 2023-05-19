//! it is just like my users controllers
const User=require('../../../models/user')
const jwt = require('jsonwebtoken')



module.exports.createSession=async function(req,res){

    try{
console.log("$$$$$",req);

        let user= await User.findOne({email:req.body.email})
        console.log(user);
        

        if(!user ||  user.password != req.body.password){
             
            return res.status(422).json({
                message: 'Invalid username or password'
            })
        }

        return res.status(200).json({
            message: 'Sign in successfully,Here is your token , So keep it safely',
            data:{
                token:jwt.sign(user.toJSON(),'codiel',{expiresIn:10000})
            }
        })

    }
    catch(e){
        console.log('****',e);
       return res.status(500).json({
        message:"Internal Server Error",
       })
    }

}