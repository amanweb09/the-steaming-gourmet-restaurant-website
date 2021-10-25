const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel : {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false   
    },
    accessToken: {
        type: Array    
    }
})

const User = new mongoose.model('users', userSchema);

module.exports = User;
