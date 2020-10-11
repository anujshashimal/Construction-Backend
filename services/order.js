const Order = require('../models/Order');
const { v1: uuidv1 } = require('uuid');

exports.saveOrderItems = async (body)=>{
    const {reqID, supplier, addressline1, addressline2, other, requiredDate} = body;
    console.log("BODY ITEMS",reqID, supplier, addressline1, addressline2, other, requiredDate)
    const OrderID = uuidv1();
    const  orderDetails = new Order({
        OrderID,
        reqID,
        supplier,
        addressline1,
        addressline2,
        other,
        requiredDate
    });
    const result = await orderDetails.save().then(()=> {console.log("Success!")})

}
