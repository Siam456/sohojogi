const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user: {
        id: mongoose.Types.ObjectId,
        name: String,
        email: String,
        phone: String,
        address: String,
        avater: String,
    },
    commentid: {
        type: mongoose.Types.ObjectId,
    },
    text: {
        type: String,
        require: true,
    },
    replyAttachment: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
        }
    ],
    
},
{
    timestamps: true,
});

const repliesModel = mongoose.model('replie' , Schema);

module.exports = repliesModel;