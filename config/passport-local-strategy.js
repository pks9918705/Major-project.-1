const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authantication using passport

passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
        //used so that req can also be sent in parameter

    }, 
    async function(req, email, password, done) {
        try {
          let user = await User.findOne({ email: email });
          
          if (!user || user.password !== password) {

            req.flash('error', 'Invalid');
            return done(null, false);

          }
          
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
      
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log("serialize call");
    done(null, user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser( async function(id, done){
    let user = await User.findById(id);
    // if(err){
    //     console.log('error in finding user ---> passport', err);
    //     return done(err);
    // }
    return done(null, user);
});
// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not sign-in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed user from the session cookie and we are just sending this  to the locals for the views
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;