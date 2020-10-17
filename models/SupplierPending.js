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
    },
    approvedUser:{
        type :String
    },
    employeeName: {
        type: String
    },
    supplierName:{
        type :String
    },
    addressline1:{
        type:String,
    },
    addressline2:{
        type:String,
    },
    other:{
        type:String,
    },
    requiredDate:{
        type:String,
    }
});

const SupplierPendingModel = mongoose.model('SupplierPendingItems',SupplierPending);

module.exports = SupplierPendingModel;
