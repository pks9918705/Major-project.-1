//! it is just like my users controllers
const User=require('../../../models/user')
const jwt = require('jsonwebtoken')



module.exports.createSession=async function(re,res){

    try{

        let user=User.findOne({email:req.body.email})

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message: 'Invalid username or password"
            })
        }

        return res.json(200,{
            message: 'Sign in successfully,Here is your token , So keep it safely',
            data:{
                token:jwt.sign(user.toJSON(),'codiel',{expiresIn:10000})
            }
        })

    }
    catch(e){
        console.log('****',e);
       return res.json(500,{
        message:"Internal Server Error",
       })
    }

}