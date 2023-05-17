//creating scheme
const mongoose = require('mongoose')

//using multer
const multer = require('multer')

const path = require('path')
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema =new mongoose.Schema({

    // email and password are the main things for authentication
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }



},{
    timestamps:true
    // it has data of time when objects is created 
});


//code for multer storage
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
      //  null and after that location where the file should be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  //static 
  userSchema.statics.uploadAvatar=multer({storage:storage}).single('avatar')
  // here we are not going to send array of files and for one file single() is used

  userSchema.statics.avatarPath=AVATAR_PATH




const User= mongoose.model('User',userSchema);

module.exports = User;
