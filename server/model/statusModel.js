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
    text: {
        type: String,
        require: true,
    },
    statusAttachment: [
        {
            type: String,
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "comment"
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

const statusModel = mongoose.model('status' , Schema);

module.exports = statusModel;