const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT=require('extract-jwt').ExtractJWT


// we are going to use User models for authentication purposes
const User = require('../models/user')

// a key need to be represt to encrypt and decrypt back 
let opts={

    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codiel'
}

// telling passport to use JWT strategy
passport.use(new JWTStrategy(opts,function(jwtPayload,done){

    //find the user based on the inforamtion in Payload
    User.findById(jwtPayload._id)
    .then(user=>{

        //here we don't need to match username and password because we already matches Playload thing , once the uuser Jwt is generated, it is used after that to authenticate the jwt 
        // here user is already present in jwt , u need to fetch the user from payload and checking if the user is there or not .
        return done(null,user)


    })
    .catch(error=>{
        console.log('Error in finding  user in jwt strategy',error);
        return;
        
    })
}))


module.exports =passport