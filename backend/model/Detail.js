const mongoose = require('mongoose');
const { Schema } = mongoose

const detailSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true,
        // default: "Dave"
    },
    lastName:{
        type: String,
        required: true,
        // default: "Barley"
    },
    jobTitle:{
        type: String,
        required: true,
        // default: "web Devlopment"
    },
    address:{
        type: String,
        required: true,
        // default: "32, Khan Market, Rabindra Nagar"
    },
    city:{
        type: String,
        required: true,
        // default: "New Delhi"
    },
    state:{
        type: String,
        required: true,
        // default: "Delhi"
    },
    zipCode:{
        type: Number,
        required: true,
        // default: "110003"
    },
    phone:{
        type: Number,
        required: true,
        // default: Number('011 2460 3423')
    },
    email:{
        type: String,
        required: true,
        // default: "abc@gmail.com"
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const Detail = mongoose.model('detail', detailSchema);
module.exports = Detail;