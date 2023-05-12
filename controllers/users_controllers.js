//importing the model
const User = require('../models/user');

const passport = require('passport');

module.exports.profile = function (req, res) {

    User.findById(req.params.id)
    .then((user) => {

        return res.render(
            'user_profile',
            {
                title: 'User Profile',
                profile_user: user
            }
    
        )

    })
    .catch(err => {
        console.log('error in finding post in user_controller', err);
        
    })

    
}
//render the sign up page
module.exports.signUp = function (req, res) {
    // if the user is signin then you can't  go to signUp
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
     
    
    return res.render(
        'user_sign_up',
        {
            title: 'Sign Up',
        }

    )
}
//render the sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render(
        'user_sign_in',
        {
            title: 'Sign In ',
        }

    )
}

//get the sign up data
module.exports.create = function (req, res) {

    //checking password==confirm password
    if (req.body.password != req.body.confirm_password) {
        // return res.render(
        //     'user_sign_up',
        //     {
        //         title: 'Sign Up',
        //         message: 'Passwords do not match'
        //     }   

        // )
        // or 
        return res.render('back')

    }
    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log("here is the user", user);
            User.create(req.body)
                .then(user => {
                    // Handle the created user object here
                    return res.redirect('/users/sign-in')
                })
                .catch(error => {
                    // Handle any errors here
                    if (error) {
                        console.log("error in creating user in signing up", error);
                        return res.redirect('back')
                    }

                });

        })
        .catch((error) => {
            // Handle any errors here
            console.log("error in finding user in signing up", error); return
        })
}






//get the sign in data
module.exports.createSession = function (req, res) {

   
     
    // sign in and create a new session
    // if the user is authenticated , redirect back to home 
    return res.redirect('/')


}



//to sign out
module.exports.destroySession = function (req, res,next) {

    //passport have this .logout()
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

