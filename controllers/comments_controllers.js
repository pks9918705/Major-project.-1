 
const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports.create = (req, res) => {
    console.log(req.body.postId);
    console.log(req.body.content);

    const id = req.body.postId.trim();
    console.log(req.body.postId);



    const objectId = new mongoose.Types.ObjectId(id);
    // used to coonvert string into ObjectId 


    Post.findOne({ _id: id })
        .then(post => {
            if (!post) {
                console.log("Post not found");
                return res.redirect('back');
            }

            Comment.create({
                content: req.body.content,
                post: objectId, // Convert string to ObjectId
                user: req.user._id
            })
                .then(comment => {

                    //creating array
                    if (!post.comments) {
                        console.log('no comments array os there');
                        
                        post.comments = [];
                        

                    }
                    if(post.comments){
                    console.log(' comments array is created');}

                    console.log("id of comment",comment.id);
                    const objectId2 = new mongoose.Types.ObjectId(comment.id);
                    

                    post.comments.push(objectId2);
                    post.save();

                    console.log("Comment done");

                    return res.redirect('/');
                })
                .catch(error => {
                    console.log("Error in creating the Comment", error);
                    return;
                });
        })
        .catch(error => {
            console.log("Error in finding the Post", error);
            return res.redirect('back');
        });
};

