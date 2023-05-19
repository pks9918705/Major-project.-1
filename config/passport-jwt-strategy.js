 

const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// we are going to use User models for authentication purposes
const User = require('../models/user');

// a key need to be represented to encrypt and decrypt back 
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'codiel'
};

// telling passport to use JWT strategy
passport.use(new JWTStrategy(opts, function(jwtPayload, done) {
  // find the user based on the information in Payload
  User.findById(jwtPayload._id)
    .then(user => {
      // here we don't need to match username and password because we already matched the payload.
      // once the user JWT is generated, it is used afterwards to authenticate the requests.
      // here, user is already present in the JWT, you need to fetch the user from payload and check if the user is there or not.
      if(user)
      return done(null, user);
      else return done(null,false)
    })
    .catch(error => {
      console.log('Error in finding user in JWT strategy', error);
      return ;
    });
}));

module.exports = passport;
