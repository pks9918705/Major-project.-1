const nodemailer = require('../../config/nodemailer')

// crating a function which we send mail
//this is another way of exporting a function
// whenever a new comment is made -- i have to call this function
exports.newComment=(comment)=>{

    // console.log('inside newComment mailer');
    // console.log('%%%%%',comment);
    // console.log('Email hai bro',comment.user.email);

    let htmlString=nodemailer.renderTemplate({comment:comment},'../../views/mailers/new_comment.ejs')
    

    nodemailer.transporter.sendMail({
        from:"priyanshu@Codiel.com",
        to:comment.user.email,
        subject:"New Comment Published",
        // html:"<h1> Yup, Your comment is published </h1>"
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail:',err);
            return;
            
        }
        console.log('Message sent',info);

        return;
        
    })
    
}
