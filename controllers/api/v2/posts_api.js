//! controller for v2

module.exports.getPosts=function(req,res){
    //index can be replaced with getPosts as it is a method name only
    return res.json(200,{
        message:"Lists of posts",
        posts:["Priyanshu Kumar Singh","Poonam devi","Satyendra Singh"]
    })
}