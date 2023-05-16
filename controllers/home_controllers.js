const cookieParser = require("cookie-parser");

const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req, res) {
  try {
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

    let users = await User.find({});

    return res.render('home', {
      title: "Home",
      posts: posts,
      all_users: users
    });
  } catch(err) {
    console.log("Error in finding posts", err);
    return res.redirect('back');
  }
};
