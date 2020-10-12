const Order = require('../models/Order');
let AppOrPending = require('../models/AppOrPenRequest');
const { v1: uuidv1 } = require('uuid');

exports.saveOrderItems = async (body)=>{
    const {reqID, supplier, addressline1, addressline2, other, requiredDate, status} = body;
    console.log("BODY ITEMS",reqID, supplier, addressline1, addressline2, other, requiredDate)
    const OrderID = uuidv1();
    const  orderDetails = new Order({
        OrderID,
        reqID,
        supplier,
        addressline1,
        addressline2,
        other,
        requiredDate,
        status
    });
    const result = await orderDetails.save().then(()=> {console.log("Success!")})
    console.log("reuslt", result);
    return result
}

exports.getPlaceOrderDetails = async (body) => {
    const {reqID} = body;
    const getDetails = await this.FINDReqIDExists(reqID);
    console.log("GETDEA", getDetails)
    if(getDetails==null|| getDetails == undefined||getDetails.length==0){
        throw new Error("Unable to find Request ID");
    }
    const data = this.FindReqIDItems(reqID)
    return data;

}

exports.FINDReqIDExists = async (reqID) =>{
    let ReqIDList = [];
    const dat = await Order.find({reqID: reqID})
    dat.forEach(data => ReqIDList.push(data));
    return ReqIDList;
}

exports.FindReqIDItems = async (reqID) => {
    let requestID = reqID;
    let itemsList = []
    const details = await AppOrPending.find({reqID: reqID})
    console.log("details",details)

    details.forEach(data => itemsList.push(data));
    return itemsList;
}

exports.FindAllItemsReqIdByOrderCollection = async () => {
    console.log("HEREE")
    let reqIDs =[];
    const dat = await Order.find({}, {reqID:1})
     dat.forEach(dat => {reqIDs.push(dat.reqID)})
    return reqIDs;
}

