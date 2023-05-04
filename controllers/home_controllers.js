const cookieParser = require("cookie-parser")

module.exports.home=function(req,res){


    //----------------------------------------------------------------
                    //to see cookies on home page
    //----------------------------------------------------------------
    // console.log(req.cookies);
    // since the above is comming cookies and we want to change in response cookie
    // res.cookie('ui',21032001)

    //? sending directly to browser 
    // return res.end('<h1>Express is up for Codeial</h1>')

    return res.render(
        'home',
        {
            title: 'Home'
        }   

    )

}

 