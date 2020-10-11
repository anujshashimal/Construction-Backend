const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApproveOrPending = new Schema({

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
        }

});

const AppOrPenModel = mongoose.model('ApproveOrPending',ApproveOrPending);

module.exports = AppOrPenModel;
