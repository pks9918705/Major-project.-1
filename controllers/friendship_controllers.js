

//add friend function
const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');


module.exports.addfriend = async (req, res) => {



    console.log('Clicked User', req.body.clickedUserId);
    console.log('Loged User', req.body.loggedInUserId);
    if (req.xhr) {
        console.log("Yes ajax hai request");

        return res.status(200).json({
            data: "Sent Request",
            message: "Ajax h"
        });
    }
    console.log("no ajax hai request");
    return;

};




