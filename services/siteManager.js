let Users = require('../models/user');
let AppOrPending = require('../models/AppOrPenRequest');
let pendingItems = require('../models/PendingItems');
let invoice = require('../models/Invoice');
let items = require('../models/Items');
let supplierItems = require('../models/SupplierItems');

let ApprovedService = require('../services/ApproveOrPending');
let itemsService = require('../services/Items');
let userService = require('../services/user');
let emailService = require('../services/emailTemplates');
let supplier = require('../services/supplier');

const {SiteManager} = require('../Constants');
const {
    SITEMANAGER_APPROVE,SITEMANAGER_PENDING,SITEMANAGER_DECLINE
}= SiteManager
const { v1: uuidv1 } = require('uuid');

exports.getAllSiteManagers = async(userType) => {
    const dat = await Users.find({userType: userType})
    if(!dat)
        return Error;
    return dat;
}

exports.getSiteManagerById = async (userID, userType) => {
    const id = await Users.find({userID: userID,userType:userType })
    if(id === null)
        throw new Error("Unable to find user!")
    return id
}

exports.updateSiteMnagerById = async (userID, body) => {
    console.log("here", userID)
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
    console.log("here", userID)

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
    console.log("EEE1")

    for (const val of body) {
        totalVal = totalVal + (val.itemPrice * val.itemQty)
        reqID = val.reqID
        empName = await userService.findEmployee(val.reqID)
    }
    // const managerApprovedItems = await this.getTheStatus()
    console.log("EEE2")
    const mana = await this.getTheSign(reqID)
    console.log("CHECKK", mana.length)
    console.log("totalVal", reqID)

    if(mana.length !==0){
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
        console.log("ERROR",e)
    }
}

exports.deleteItemsWhenReceived = async (body) => {
    let reqIDs = body.reqID
    let employeeName;
    employeeName = await userService.findEmployee( body.reqID)

    let {reqID, itemDescription} = body
    const items = await AppOrPending.find({"reqID":reqIDs[0]})
    let result;
    let info = [];
    for (const data of items) {
        for(const da of itemDescription){
            if(da === data.itemDescription){
                const invoiceInfo = await this.addReceivedItemsToInvoice(employeeName, data)
                result = await AppOrPending.findOneAndDelete({itemDescription: data.itemDescription})
                await supplierItems.updateMany({reqID:reqID}, {status:"DELIVERED"})
                info.push(result)
                console.log("INVOICEINFO", result)
            }
        }
    }
    await emailService.sendEmailWhenReceivedItems(info)
    console.log("INVOICEINFO", info)

    return result
}

exports.declineRequestion = async (body) => {
    const {reqID} = body

    const declineReq = await items.deleteMany({ItemID:reqID})
    if(declineReq.deletedCount === 0)
        return null
    return SITEMANAGER_DECLINE

}

exports.savePendingValue = async (reqID) => {

    const reqIDs = reqID
    const peningItemsInfo = await items.find({ItemID: reqIDs})
    await ApprovedService.savePendingItems(peningItemsInfo)
}

exports.getTheStatusOfPendingStatus = async (reqID, status) => {
    console.log("aqwd")

    console.log(reqID, status)
    const idset = await this.getALlPendingItemsId(reqID)
    for (const data of idset) {
        if(data.reqID === reqID){
            const result = await pendingItems.updateMany({"reqID": reqID}, {"status": status})
            const resw = await pendingItems.find({reqID: reqID})
            console.log("wdqq",resw)
            await ApprovedService.saveAppOrReqManager(resw)
            const result12 = await pendingItems.deleteMany({reqID: reqID})
        }
    }
}

exports.getTheStatus = async () => {

    const result = await pendingItems.find({"status":SITEMANAGER_APPROVE})
    return result
}

exports.getTheSign = async (reqID) => {
    console.log("reqID", reqID)

    const result = await items.find({ItemID:reqID,ManagerSign:"SIGNED"})
    console.log("aefqqq",result)
    return result
}
exports.getALlPendingItemsId = async (resID) => {
    const reuslt = await pendingItems.find({reqID:resID})
    console.log("MYSSS", reuslt)
    return reuslt
}

exports.addReceivedItemsToInvoice = async (employeeName, data) => {
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
}



