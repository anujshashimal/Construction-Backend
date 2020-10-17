const Order = require('../models/Order');
let AppOrPending = require('../models/AppOrPenRequest');
let SupplierItems = require('../models/SupplierItems');
let supplierService = require('./supplier');
let supplierPending = require('../models/SupplierPending');

const { v1: uuidv1 } = require('uuid');

exports.saveOrderItems = async (body)=>{
    try{
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
    await SupplierItems.updateMany({reqID:reqID},{ supplierName:supplier, addressline1:addressline1, addressline2:addressline2, other:other, requiredDate:requiredDate})
    return result
    }catch (e) {
        throw new Error(e)
    }
}

exports.getPlaceOrderDetails = async (body) => {
    try {
        const {reqID} = body;
        const getDetails = await this.FINDReqIDExists(reqID);
        if (getDetails == null || getDetails == undefined || getDetails.length == 0) {
            throw new Error("Unable to find Request ID");
        }
        const data = await this.FindReqIDItems(reqID)
        return data;
    }catch (e) {
        throw new Error(e)
    }
}

exports.FINDReqIDExists = async (reqID) =>{
    try{
    let ReqIDList = [];
    const dat = await Order.find({reqID: reqID})
    dat.forEach(data => ReqIDList.push(data));
    return ReqIDList;
    }catch (e) {
        throw new Error(e)
    }
}

exports.FindReqIDItems = async (reqID) => {
    try{
    let requestID = reqID;
    let itemsList = []
    const details = await supplierPending.find({reqID: reqID, status:"WAITING"})

    details.forEach(data => itemsList.push(data));
    return itemsList;
    }catch (e) {
        throw new Error(e)
    }
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

exports.FindAllItemsReqIdByOrderCollection = async () => {
    try{
    let reqIDs =[];
    const dat = await Order.find({}, {reqID:1})

    dat.forEach(dat => {reqIDs.push(dat.reqID)})

    const unique = reqIDs.filter(onlyUnique);

    return unique;
    }catch (e) {
        throw new Error(e)
    }
}

exports.managerSaveOrderItems = async (body)=>{
    try{
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
    }catch (e) {
        throw new Error(e)
    }
    }

exports.FindAllItemsReqIdByOrderCollectionSiteManager = async () => {
    try{
    let reqIDs =[];
    const dat = await AppOrPending.find({}, {reqID:1})
    console.log("awdaf", dat)
    dat.forEach(dat => {reqIDs.push(dat.reqID)})

    const unique = reqIDs.filter(onlyUnique);

    return unique;
    }catch (e) {
        throw new Error(e)
    }
    }

exports.FindReqIDItemsSiteManager = async (reqID) => {
    let requestID = reqID;
    let itemsList = []
    const details = await AppOrPending.find({reqID: reqID})

    details.forEach(data => itemsList.push(data));
    return itemsList;
}

