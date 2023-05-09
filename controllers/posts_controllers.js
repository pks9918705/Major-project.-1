const Post=require('../models/post')

module.exports.create=function(req, res){


    //creating a new post
    Post.create({
        content: req.body.content,
        
        user: req.user._id
    }) 
    .then((result)=>{
        console.log('post added successfully');
       
         return res.redirect('back');
        
    })
    .catch((err)=>{
        console.log('error creating post',err);
        return res.redirect('back');
        

    })


}