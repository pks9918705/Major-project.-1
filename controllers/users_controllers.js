// this is a controller that controls many user
module.exports.profile=function(req,res){

    return res.render(
        'user_profile',
        {
            title: 'User Profile',
        }   

    )
}
// aise hi run krke dkho -timepass
module.exports.timepass=function(req,res){
    return res.end('<h1>Time Pass</h1>')
}