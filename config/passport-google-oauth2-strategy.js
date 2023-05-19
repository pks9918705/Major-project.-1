const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto=require('crypto')
const User=require('../models/user')


// tell passport to use new strategy for login
passport.use(
    new googleStrategy(
      {
        clientID: "486927193886-toblomjhkgoupremp10b8f26t51i8o2p.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        // Find the user
        User.findOne({ email: profile.emails[0].value })
          .then((user) => {
            if (user) {
              // If the user is found, set the user as req.user
              return done(null, user);
            } else {
              // If the user is not found, create the user and set it as req.user
              User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString("hex"),
              })
                .then((user) => {
                  return done(null, user);
                })
                .catch((err) => {
                  console.log(
                    "error in creating user google strategy-passport",
                    err
                  );
                  return done(err);
                });
            }
          })
          .catch((err) => {
            console.log("error in google strategy-passport", err);
            return done(err);
          });
      }
    )
  );
  

module.exports=passport