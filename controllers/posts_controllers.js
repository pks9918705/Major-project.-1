const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.create=function(req, res){


    //creating a new post
    Post.create({
        content: req.body.content,
        
        user: req.user._id
    }) 
    .then((result)=>{
        console.log('post added successfully');

        req.flash('success',"Post created successfully")
       
         return res.redirect('back');
        
    })
    .catch((err)=>{
        console.log('error creating post',err);
        req.flash('error',"Post creation failed")
        return res.redirect('back');
        

    })


}


 
//? for deleting the post 
module.exports.destroy = function(req, res) {
    // Find the post to check if it exists or not
    Post.findById(req.params.id)
      .then((post) => {
        //!.id means converting the object id into a string 
        if (post.user == req.user.id) {
          // Delete associated comments
          Comment.deleteMany({ post: req.params.id })
            .then(() => {
              // Delete the post
              Post.findByIdAndDelete(req.params.id)
                .then(() => {
                  console.log('Post deleted');
                  req.flash('success',"Post deleted successfully")
                  return res.redirect('back');
                })
                .catch((err) => {
                  console.log('Failed to delete post', err);
                  req.flash('error',"Post deletion failed")
                  return res.redirect('back');
                });
            })
            .catch((err) => {
              console.log('Failed to delete comments', err);
              return res.redirect('back');
            });
        } else {
          console.log('Unauthorized to delete the post');
          return res.redirect('back');
        }
      })
      .catch((error) => {
        console.log('Post not found for deletion', error);
        return res.redirect('back');
      });
  };
  