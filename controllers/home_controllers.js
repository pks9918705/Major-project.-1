const cookieParser = require("cookie-parser")

const Post = require("../models/post")
 

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
    Post.find({}).populate('user')
    .then(posts => {
        return res.render(
            'home',
            {
                title: "Home",
                posts: posts
            }
        );
    })

    .catch(err=>{
        console.log("error in finding post",err)
      return res.redirect('back')
    })

    
}

 