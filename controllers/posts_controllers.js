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
       
         return res.redirect('back');
        
    })
    .catch((err)=>{
        console.log('error creating post',err);
        return res.redirect('back');
        

    })


}


// for deleteing the post 
// module.exports.destroy=function(req, res){

  //first we find the post exist or not
//     Post.findById(req.params.id)
//     .then((post)=>{

   // .id is use to converting the object id into a string
//         if(post.user == req.user.id){
           // post.remove()
//             Post.findByIdAndDelete(req.params.id)
//             .then((post)=>{
//                 console.log('post delted');
//                 return res.redirect('back');
                
//             })
//             .catch((err)=>{
//                 console.log('post delete error');
//                 return res.redirect('back')
                
//             })

//             Comment.deleteMany({post:req.params.id})
//             .then((result)=>{
//                 console.log('deleting is done');
//                 return res.redirect('back')
                
//             })
//             .catch((err)=>{
//                 console.log('not deleted',err);
//                 return res.redirect('back')
                
//             })
            
//         }
//     })
//     .catch((error)=>{
//         console.log('post not found for delete',error);
//         return res.redirect('back')
        
//     })


// }
module.exports.destroy = function(req, res) {
    // Find the post to check if it exists or not
    Post.findById(req.params.id)
      .then((post) => {
        if (post.user == req.user.id) {
          // Delete associated comments
          Comment.deleteMany({ post: req.params.id })
            .then(() => {
              // Delete the post
              Post.findByIdAndDelete(req.params.id)
                .then(() => {
                  console.log('Post deleted');
                  return res.redirect('back');
                })
                .catch((err) => {
                  console.log('Failed to delete post', err);
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
  