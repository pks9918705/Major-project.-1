const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');
const commentMailer = require('./mailers/comments_mailer');

module.exports.create = async (req, res) => {
  try {
    const id = req.body.postId.trim();

    const objectId = new mongoose.Types.ObjectId(id);

    const post = await Post.findOne({ _id: id });
    if (!post) {
      console.log("Post not found");
      return res.redirect('back');
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: objectId,
      user: req.user._id
    });

    if (!post.comments) {
      console.log('No comments array exists');
      post.comments = [];
    }
    console.log('Comments array is created');

    const objectId2 = new mongoose.Types.ObjectId(comment.id);
    post.comments.push(objectId2);
    await post.save();

    console.log("Comment done");

    //populate kiya gaya hai user ko but email shirf kiya gaya hai 
    //agar email nhi ligkhoge toh user ka sara info populate ho jagya includig password
    // ******
    // In this specific line, comment.populate('user','email') is populating the user field of the comment object with the fields specified, which is email. This means that the user field will be replaced with the complete user object, but only the email field will be populated with data. Other fields of the user object will be omitted.
    // *******

    // below user email and name is passed
    const populatedComment = await comment.populate('user','email name ');
    commentMailer.newComment(populatedComment);

    return res.redirect('/');
  } catch (error) {
    console.log("Error in creating the Comment", error);
    return res.redirect('back');
  }
};
