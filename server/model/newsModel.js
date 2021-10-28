const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    newsCoverPhoto: {
        type: String,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    catagory: {
        type: String,
        default: 'Sports'
    },
    view: {
        type: Number,
        default: 0,
    }
    
    
},
{
    timestamps: true,
});

const newsModel = mongoose.model('newse' , Schema);

module.exports = newsModel;