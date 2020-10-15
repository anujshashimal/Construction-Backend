const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierItems = new Schema({

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

const supplierModel = mongoose.model('SupplierItem',supplierItems);

module.exports = supplierModel;
