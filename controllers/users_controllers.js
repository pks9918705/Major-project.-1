// this is a controller that controls many user
module.exports.profile=function(req,res){
    // In this case, the data passed to the "view template" is an object with a single property title set to the string value 'User Profile'. This value can be used within the view template to dynamically display the page title.
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