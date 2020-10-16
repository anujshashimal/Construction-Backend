const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierPending = new Schema({

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

const SupplierPendingModel = mongoose.model('SupplierPendingItems',SupplierPending);

module.exports = SupplierPendingModel;
