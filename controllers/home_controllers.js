const cookieParser = require("cookie-parser")

const Post = require("../models/post")
const User = require("../models/user")
 

module.exports.home=function(req,res){


    //----------------------------------------------------------------
                    //to see cookies on home page
    //----------------------------------------------------------------
    // console.log(req.cookies);
    // since the above is comming cookies and we want to change in response cookie
    // res.cookie('ui',21032001)

    //? sending directly to browser 
    // return res.end('<h1>Express is up for Codeial</h1>')

    

    //findiing and send the array
    //populate the user obj
    // Post.find({}).populate('user')
    // .then(posts => {
    //     return res.render(
    //         'home',
    //         {
    //             title: "Home",
    //             posts: posts
    //         }
    //     );
    // })

    // .catch(err=>{
    //     console.log("error in finding post",err)
    //   return res.redirect('back')
    // })

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
                populate: {
                    path: 'user'
                }
    })
    .then(posts => {

        //findinng all the users
        User.find({})
        .then(users => {

            return res.render(
                'home',
                {
                    title: "Home",
                    posts: posts,
                    all_users:users
                }
            );

        })


        
    })

    .catch(err=>{
        console.log("error in finding post",err)
      return res.redirect('back')
    })



    
}

 