const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovedItems = new Schema({

        reqID:{
            type: String
        },
        itemDescription:{
            type:String
        },
        itemPrice:{
            type: String
        },
        itemQty:{
            type: String
        },
        status:{
            type:String
        },
        approvedUser:{
            type :String
        },
        employeeName:{
        type :String
        }

});

const ApprovedModel = mongoose.model('ApprovedItems',ApprovedItems);

module.exports = ApprovedModel;
