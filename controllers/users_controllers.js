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
    .catch((err )=> {
        console.log('error in finding profile', err);
        
    })

    

    
}

//updating profile data

module.exports.Update =async function (req, res) {
    // we have to check that current_user.id should be same who editted the profile form otherwise anyone can put id and update someone's other profile 

    // if the id property of the user object in the request (req.user.id) is equal to the id parameter in the request URL (req.params.id). It is comparing whether the ID of the currently authenticated user (retrieved from req.user.id) matches the ID specified in the URL.
    if(req.user.id == req.params.id){
    //    let updatedUser=
        // .then( (updatedUser) => {
        //     console.log('Your profile has been updated',updatedUser);
        //     return res.redirect('back')
            
        // })
        try{

            //finding the user
            let user=await User.findByIdAndUpdate(req.params.id,req.body)
            User.uploadAvatar(req,res,function(error){
                if(error){
                    console.log('******mutler error:',error)
                }
                // console.log(req.file);
                user.name=req.body.name
                user.email=req.body.email

                //when user is uploaded a file
                if(req.file)
                {
                    // this is saving the uploaded the file path in the avatar field of user 
                    user.avatar=User.avatarPath + '/' + req.file.filename

                }
                user.save()
                return res.redirect('back')
                
            })




        }
        catch(err){

            req.flash("error",err)
            return res.redirect('back')

        }
        
        
    }
    else{
        console.log('Hato bhencho nhi hoga update ',err);
        return res.status(401).send('Unauthorized')
    }
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

    //? here we need to show flash 
    req.flash('success','Logged in successfully')
    return res.redirect('/')


}



//to sign out
module.exports.destroySession = function (req, res,next) {

    //passport have this .logout()
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success','Logged out successfully')
        res.redirect('/');
      });
}

