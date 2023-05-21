const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.ObjectId
    },
    //this define the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        // refPath means a path to some other field which is there that field is going to define on which type of object the like has been placed 
        refPath:'onModel'
    },
    //this field is used for defining the type of the liked obect since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});
//telling mongoose that this is a model and export it
const Like =mongoose.model('Like',likeSchema)
module.exports = Like;

//? In the given code, "enum" is an array that specifies the allowed values for the onModel field. It contains two values: 'Post' and 'Comment'. This means that the onModel field can only have one of these two values.