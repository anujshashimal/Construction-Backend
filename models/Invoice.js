const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invoiceinfo = new Schema({
    OrderID:{
        type: String,
        required: true
    },
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
    },
    status:{
        type:String
    }
});

const InvoiceModel = mongoose.model('Invoice',Invoiceinfo);

module.exports = InvoiceModel;
