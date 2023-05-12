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


// for deleteing the post 
module.exports.destroy=function(req, res){

    //first we find the post exist or not
    Post.findById(req.params.id)
    .then((post)=>{

        // .id is use to converting the object id into a string
        if(post.user == req.user.id){
            post.remove()

            Comment.deleteMany({post:req.params.id})
            .then((result)=>{
                console.log('deleting is done');
                return res.redirect('back')
                
            })
            .catch((err)=>{
                console.log('not deleted');
                return res.redirect('back')
                
            })
            
        }
    })
    .catch((error)=>{
        console.log('post not found for delete',error);
        return res.redirect('back')
        
    })


}