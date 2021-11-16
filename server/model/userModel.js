const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    shopname: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
    avater: {
        type: String
    },
    about: {
        type: String,
        default: null,
    },
    coverPhoto: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ["user" , "admin" , "seller" , "rider"],
        default: "user"
    },
    vehicle: {
        type: String,
        default: null,
    },
    catagory: {
        type: String,
        default: 'Food',
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "product"
        }
    ],
    status: {
        type: String,
        enum: ['free','busy'],
        default: 'free',
    },
    Bkash: {
        type: String,
        require: true,
        default: null
    },
    Rocket: {
        type: String,
        require: true,
        default: null
    },
    Nagad: {
        type: String,
        require: true,
        default: null
    },
    
},
{
    timestamps: true,
});

const people = mongoose.model('user' , Schema);

module.exports = people;