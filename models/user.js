//creating scheme
const mongoose = require('mongoose')

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
    }



},{
    timestamps:true
    // it has data of time when objects is created 
});


const User= mongoose.model('User',userSchema);

module.exports = User;
