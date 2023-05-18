module.exports.index=function(req,res){
    //index can be replaced with getPosts as it is a method name only
    return res.json(200,{
        message:"Lists of posts",
        posts:[]
    })
}