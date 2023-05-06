//importing the model
const User = require('../models/user');

module.exports.profile = function (req, res) {

    return res.render(
        'user_profile',
        {
            title: 'User Profile',
        }

    )
}
//render the sign up page
module.exports.signUp = function (req, res) {
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
