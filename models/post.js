const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        //User is the schema which we are reffering
    }
},{
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;