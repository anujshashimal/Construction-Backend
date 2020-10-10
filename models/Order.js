const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({

    reqID:{
        type:String,
        required: true
    },
    supplier:{
        type:String,
        required: true
    },
    addressline1:{
        type:String,
        required: true
    },
    addressline2:{
        type:String,
    },
    other:{
        type:String,
    },
    requiredDate:{
        type:String,
        required: true
    }
});

const UsersModel = mongoose.model('Users',Users);

module.exports = UsersModel;
