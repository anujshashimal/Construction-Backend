const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({

    userID:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
    },
    userType:{
        type:String,
        required: true
    }
});

const UsersModel = mongoose.model('Users',Users);

module.exports = UsersModel;