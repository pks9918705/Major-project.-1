module.exports.home=function(req,res){

    //? sending directly to browser 
    // return res.end('<h1>Express is up for Codeial</h1>')

    return res.render(
        'home',
        {
            title: 'Home'
        }   

    )

}

 