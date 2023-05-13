//middleware has 3 arguments:- req,res,next


//we acess the locals in templates


module.exports.setFlash = function(req, res,next){

    res.locals.flash = {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next()
}