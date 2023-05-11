// const mongoose = require('mongoose');


// const postSchema = new mongoose.Schema({

//     content: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//         //User is the schema which we are reffering

//         // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }: This defines a field named "user" in the schema. It specifies that the field should be of type mongoose.Schema.Types.ObjectId, which is a reference to another document's _id field. The ref option specifies that this field is referencing the "User" schema. This allows you to establish a relationship between the post and the user who created it.
 
//     },
//     //! include the array of ids of all comments in this post schema itself
//     comments:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:'Comment' //schema name

//     }
// },{
//     timestamps: true
// })

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
