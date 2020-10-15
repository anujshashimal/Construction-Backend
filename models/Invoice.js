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
    itemDescription:{
        type:String,
    },
    itemPrice:{
        type:String,
    },
    itemQty: {
        type: String,
    },
    approvedUser:{
        type: String,
    },
    employeeName:{
        type :String
    }

});

const InvoiceModel = mongoose.model('Invoice',Invoiceinfo);

module.exports = InvoiceModel;
