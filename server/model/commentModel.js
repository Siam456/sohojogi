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