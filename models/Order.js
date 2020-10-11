const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
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
    }
});

const OrdersModel = mongoose.model('Order',Order);

module.exports = OrdersModel;
