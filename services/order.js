const Order = require('../models/Order');
let AppOrPending = require('../models/AppOrPenRequest');
let SupplierItems = require('../models/SupplierItems');
const { v1: uuidv1 } = require('uuid');

exports.saveOrderItems = async (body)=>{
    const {reqID, supplier, addressline1, addressline2, other, requiredDate, status} = body;
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
    const result = await orderDetails.save().then(()=> {console.log("Success!")});
    await SupplierItems.update({reqID:reqID},{ supplierName:supplier, addressline1:addressline1, addressline2:addressline2, other:other, requiredDate:requiredDate}, {multi: true})
    return result
}

exports.getPlaceOrderDetails = async (body) => {
    const {reqID} = body;
    const getDetails = await this.FINDReqIDExists(reqID);
    if(getDetails==null|| getDetails == undefined||getDetails.length==0){
        throw new Error("Unable to find Request ID");
    }
    const data = await this.FindReqIDItems(reqID)
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

    details.forEach(data => itemsList.push(data));
    return itemsList;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

exports.FindAllItemsReqIdByOrderCollection = async () => {
    let reqIDs =[];
    const dat = await Order.find({}, {reqID:1})

     dat.forEach(dat => {reqIDs.push(dat.reqID)})

    const unique = reqIDs.filter(onlyUnique);

    return unique;
}

exports.managerSaveOrderItems = async (body)=>{

    const {reqID, supplier, addressline1, addressline2, other, requiredDate, status} = body;
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


