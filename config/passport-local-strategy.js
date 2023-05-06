const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

//import User from Models
const User = require('../models/user')




// we need to tell passport to use the local strategy
passport.use(new LocalStrategy({

    usernameField: 'email'
},
    function (email, password, done) {




        //find the user and stablish the identity
        User.findOne({ email: email })
            .then(user => {
                console.log(email);
                console.log(user);
                
                if (!user || user.password != password) {
                    console.log("Invalid username or password")
                    return done(null, false)
                    //error is null and authentication is false
 

                }
                // done has two arguments:- 1st one is error and 2nd one is Something else 
                // console.log('user found in db');
                
                return done(null, user)
            })
            .catch(err => {

                console.log("Error occured", err)
                return done(err)
            })

    }));


// serilizing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    console.log('serialise done');
    console.log(user.id);
    
    done(null, user.id)
    // it will automatically encrypt it the user-id automatically into the cookie
})

// passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

//deserializing the user from the key in the cookies
passport.deserializeUser(function (user, done) {
    //find the user in the database
    
    
    
    User.findById(user.id)
        .then((user) => {
            console.log('deserialised done');

            return done(null, user)

        })
        .catch((err) => {
            console.log("Error in finding user ---> passport");
            return done(err)

        })
})


// check if the user is authenticated
passport.checkAuthentication=function(req,res,next) {
    // if the user is signned in ,then pass on the request to the next function(controllers action) 

    
    
    if(req.isAuthenticated()){
        console.log('req.isAuthenticated()');
        return next()
    }
    // if the user is not sign in 
    console.log('user is not signed in');
    
    return res.redirect('/users/sign-in')
  
}

passport.setAuthenticatedUser=function(req,res,next) {
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to locals for the view
        res.locals.user=req.user

    }
    next()
}
 
module.exports = passport

// This code is implementing authentication functionality using Passport in a Node.js web application.

// First, the code imports the passport module and the LocalStrategy strategy from the passport-local package. It also imports the User model from the ../models/user file.

// The LocalStrategy strategy is used to authenticate users based on a username (in this case, the user's email address) and password. The strategy is configured to use the email field as the username field.

// The passport.use() function is used to register the strategy with Passport. The function takes two arguments: the first is an options object that specifies the username field, and the second is a callback function that is executed when a user attempts to authenticate.

// Inside the callback function, the code uses User.findOne() method to search for the user in the database using their email address. If the search fails or the user's password is incorrect, the function returns false to indicate that authentication has failed. If the user is found and their password is correct, the function returns the user object to indicate that authentication was successful.

// The passport.serializeUser() and passport.deserializeUser() functions are used to manage user sessions. These functions are called whenever a user logs in or out of the application. passport.serializeUser() is used to serialize the user object into a session cookie, while passport.deserializeUser() is used to deserialize the user object from the session cookie.

// Finally, the passport module is exported so that it can be used in other parts of the application.





