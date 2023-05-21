const Post=require('../models/post')
const Comment=require('../models/comment')
const Like=require('../models/like')
// module.exports.create=function(req, res){


//     //creating a new post
//     Post.create({
//         content: req.body.content,
        
//         user: req.user._id
//     }) 
//     .then((post)=>{

//       //! ********* this is the server side code of AJAX for post creation *******
//       // checking the req is AJAX or not
//       if(req.xhr)
//       {
//         return res.status(200).json({
//           data:{
//             post:post
//           },
//           message:"Post created successfully"
//         })
//       }
//         // console.log('post added successfully');

//         req.flash('success',"Post created successfully")
       
//          return res.redirect('back');
        
//     })
//     .catch((err)=>{
//         console.log('error creating post',err);
//         req.flash('error',"Post creation failed")
//         return res.redirect('back');
        
//     })
// }
// //? for deleting the post 
// module.exports.destroy = function(req, res) {
//     // Find the post to check if it exists or not
//     Post.findById(req.params.id)
//       .then((post) => {
//         //!.id means converting the object id into a string 
//         if (post.user == req.user.id) {

//            //? Delete the post and likes belongs to the post and comments delte to
//           // await Like.deleteMany({likeable:post ,onModel:'Post'})
//           // await Like.deleteMany({likeable:post ,onModel:'Post'})


//           // Delete associated comments
//           Comment.deleteMany({ post: req.params.id })
//             .then(() => {
//               // Delete the post
//               Post.findByIdAndDelete(req.params.id)
//                 .then(() => {
//                   console.log('Post deleted');
//                   req.flash('success',"Post deleted successfully")
//                   return res.redirect('back');
//                 })
//                 .catch((err) => {
//                   console.log('Failed to delete post', err);
//                   req.flash('error',"Post deletion failed")
//                   return res.redirect('back');
//                 });
//             })
//             .catch((err) => {
//               console.log('Failed to delete comments', err);
//               return res.redirect('back');
//             });
//         } else {
//           console.log('Unauthorized to delete the post');
//           return res.redirect('back');
//         }
//       })
//       .catch((error) => {
//         console.log('Post not found for deletion', error);
//         return res.redirect('back');
//       });
//   };
  




 

module.exports.create = async function(req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post
        },
        message: "Post created successfully"
      });
    }

    req.flash('success', "Post created successfully");
    return res.redirect('back');
  } catch (err) {
    console.log('error creating post', err);
    req.flash('error', "Post creation failed");
    return res.redirect('back');
  }
};

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {

      // deleting the likes of post as well as the comments of that post 
      await Like.deleteMany({likeable:post,onModel:'Post'})
      await Like.deleteMany({ _id:{$in : post.comments}})
        
        post.remove()



      await Comment.deleteMany({ post: req.params.id });

      await Post.findByIdAndDelete(req.params.id);

      console.log('Post deleted');
      req.flash('success', "Post deleted successfully");
      return res.redirect('back');
    } else {
      console.log('Unauthorized to delete the post');
      return res.redirect('back');
    }
  } catch (error) {
    console.log('Post not found for deletion', error);
    return res.redirect('back');
  }
};
