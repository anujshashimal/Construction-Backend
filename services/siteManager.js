let Users = require('../models/user');
let AppOrPending = require('../models/AppOrPenRequest');
let pendingItems = require('../models/PendingItems');
let invoice = require('../models/Invoice');
let items = require('../models/Items');
let supplierItems = require('../models/SupplierItems');
let supplierPending = require('../models/SupplierPending');

let ApprovedService = require('../services/ApproveOrPending');
let itemsService = require('../services/Items');
let userService = require('../services/user');
let emailService = require('../services/emailTemplates');
let supplier = require('../services/supplier');

const {SiteManager} = require('../Constants');
const {
    SITEMANAGER_APPROVE,SITEMANAGER_PENDING,SITEMANAGER_DECLINE, MANAGER_SIGNED, DELIVERED
}= SiteManager
const { v1: uuidv1 } = require('uuid');

exports.getAllSiteManagers = async(userType) => {
    const dat = await Users.find({userType: userType})
    if(!dat)
        return Error;
    return dat;
}

exports.getSiteManagerById = async (userID, userType) => {
    try{
    const id = await Users.find({userID: userID,userType:userType })
    if(id === null)
        throw new Error("Unable to find user!")
    return id
    }catch (e) {
        throw new Error(e)
    }
}

exports.updateSiteMnagerById = async (userID, body) => {
    try{
    const id = await Users.findOneAndUpdate({userID: userID}, body)
    if(id==null|| id == undefined)
        throw new Error("Unable to find user!")
    return id
    }catch (e) {
        console.log(e)
    }
}

exports.deleteSiteManagerByID = async (userID) => {
    const id = await Users.findOneAndDelete({userID: userID})
    if(id==null|| id == undefined)
        throw new Error("Unable to delete user!")
    return id
}
exports.getProductByID = async (userID) =>{

}

exports.getSiteManagerApproval = async (body) => {
    try{
    let Price, Qty,reqID,empName;
    let totalVal = 0;

    for (const val of body) {
        totalVal = totalVal + (val.itemPrice * val.itemQty)
        reqID = val.reqID
        empName = await userService.findEmployee(val.reqID)
    }
    const getTheSign = await this.getTheSign(reqID)

    if(getTheSign.length !==0){
        await ApprovedService.saveAppOrReq(empName, body);
        await supplier.saveItemsInSupplierTable(empName, body);
        await itemsService.deleteItemsWhenApproved(body)
        return SITEMANAGER_APPROVE
    }
    if(totalVal < 100000 ){
        await ApprovedService.saveAppOrReq(empName, body);
        await supplier.saveItemsInSupplierTable(empName, body);
        await itemsService.deleteItemsWhenApproved(body)
        return SITEMANAGER_APPROVE
    }else{
        await this.savePendingValue(reqID)
        await itemsService.deleteItemsWhenApproved(body)
        return SITEMANAGER_PENDING
    }
    }catch (e) {
        throw new Error(e)
    }
}

exports.deleteItemsWhenReceived = async (body) => {
    try{
    let reqIDs = body.reqID
    let employeeName;
    employeeName = await userService.findEmployee( body.reqID)

    let {reqID, itemDescription} = body
    const items = await supplierPending.find({reqID:reqIDs[0]})
    let result;
    let info = [];
    for (const data of items) {
        for(const da of itemDescription){
            if(da === data.itemDescription){
                await this.addReceivedItemsToInvoice(employeeName, data)
                result = await AppOrPending.findOneAndDelete({itemDescription: data.itemDescription})
                await supplierPending.updateMany({reqID:reqID,itemDescription: data.itemDescription}, {status:DELIVERED})
                await supplierPending.updateMany({reqID:reqID,itemDescription: data.itemDescription})
                info.push(result)
            }
        }
    }
    await emailService.sendEmailWhenReceivedItems(info)
    return result
    }catch (e) {
        throw new Error(e)
    }
}

exports.declineRequestion = async (body) => {
    try{

    const {reqID} = body
    const declineReq = await items.deleteMany({ItemID:reqID})
    if(declineReq.deletedCount === 0)
        return null
    return SITEMANAGER_DECLINE
    }catch (e) {
        throw new Error(e)
    }
}

exports.savePendingValue = async (reqID) => {

    const reqIDs = reqID
    const peningItemsInfo = await items.find({ItemID: reqIDs})
    await ApprovedService.savePendingItems(peningItemsInfo)
}

exports.getTheStatusOfPendingStatus = async (reqID, status) => {
    try{

    console.log(reqID, status)
    const idset = await this.getALlPendingItemsId(reqID)
    for (const data of idset) {
        if(data.reqID === reqID){
            await pendingItems.updateMany({"reqID": reqID}, {"status": status})
            const resw = await pendingItems.find({reqID: reqID})
            await ApprovedService.saveAppOrReqManager(resw)
            await pendingItems.deleteMany({reqID: reqID})
        }
    }
    }catch (e) {
        throw new Error(e)
    }
}

exports.getTheStatus = async () => {

    const managerApprovedItm = await pendingItems.find({"status":SITEMANAGER_APPROVE})
    return managerApprovedItm
}

exports.getTheSign = async (reqID) => {
    try{
    const managerSignedItems = await items.find({ItemID:reqID,ManagerSign:MANAGER_SIGNED})
        return managerSignedItems
    }catch (e) {
        throw new Error(e)
    }
}
exports.getALlPendingItemsId = async (resID) => {
    const pendingItems = await pendingItems.find({reqID:resID})
    return pendingItems
}

exports.addReceivedItemsToInvoice = async (employeeName, data) => {
    try{
    const items = []
        const {reqID, itemDescription, itemPrice,itemQty, approvedUser} = data;
        const OrderID = uuidv1();
        const  orderDetails = new invoice({
            OrderID,
            reqID,
            itemDescription,
            itemPrice,
            itemQty,
            approvedUser,
            employeeName
        });
        const result = await orderDetails.save().then(()=> {console.log("Success!")})
        return result;
    }catch (e) {
        throw new Error(e)
    }
}



