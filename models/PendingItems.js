const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingItems = new Schema({

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
    }

});

const PendingModel = mongoose.model('PendingItems',PendingItems);

module.exports = PendingModel;
