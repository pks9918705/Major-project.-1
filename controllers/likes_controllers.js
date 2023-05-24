const Like=require('../models/like')
const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.toggleLike=async function(req,res){


    try{

        let likeable;
        let deleted=false;
        if(req.query.type == 'Post'){
            likeable=await Post.findById(req.query.id).populate('likes')
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes')
        }
        //check if a like already exists
        let exisitingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        if(exisitingLike){
            likeable.likes.pull(exisitingLike._id);
            likeable.save();
            await Like.deleteOne({ _id: exisitingLike._id }); 
            // Use deleteOne() instead of remove()
            deleted = true;
        }else{
            //else make a new like
            let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type 
            });
            //likeable has a post or comment in it and likes is present in post or comment 
            //likes is array and .push()/.pull() is function 
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message:"Request successful!",
            data:{
                deleted:deleted
            }
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server Error'
        })
        
    }


// ********************************
//?  What is req.query.type ?
// In this code, the query is an object used to specify the conditions for finding an existing like in the database. It is used as an argument in the Like.findOne() function to search for a specific document that matches the specified criteria.





}