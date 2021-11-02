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
    statusid: {
        type: mongoose.Types.ObjectId,
    },
    text: {
        type: String,
        require: true,
    },
    commentAttachment: {
        type: String,
    },
    replies: [
        {
            user: {
                id: mongoose.Types.ObjectId,
                name: String,
                email: String,
                phone: String,
                address: String,
                avater: String,
            },
            id: mongoose.Types.ObjectId,
            text: String,
            likes: [],
            createdAt: Date,
            replyAttachment: String,
        }
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
        }
    ],
    
},
{
    timestamps: true,
});

const commnetModel = mongoose.model('comment' , Schema);

module.exports = commnetModel;