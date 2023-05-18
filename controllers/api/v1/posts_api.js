
const Post=require('../../../models/post')
module.exports.index= async function(req,res){
    //index can be replaced with getPosts as it is a method name only

    let posts = await Post.find({})
    //sort is used to sort the array with respect to time- "most recent firrst"
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });
    return res.json(200,{
        message:"Lists of posts",
        posts:posts
    })
}