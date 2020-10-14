const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompltedItems = new Schema({

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

const completedModel = mongoose.model('CompleteItems',CompltedItems);

module.exports = completedModel;
