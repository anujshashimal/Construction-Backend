let Users = require('../models/user');
let AppOrPending = require('../models/AppOrPenRequest');
let pendingItems = require('../models/PendingItems');
let invoice = require('../models/Invoice');
let items = require('../models/Items');
let ApprovedService = require('../services/ApproveOrPending');
let itemsService = require('../services/Items');
let userService = require('../services/user');

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

    const id = await Users.findOneAndUpdate({userID: userID}, body)
    if(id==null|| id == undefined)
        throw new Error("Unable to find user!")

    console.log("awd", id)
    return id
}

exports.deleteSiteManagerByID = async (userID) => {
    console.log("here", userID)

    const id = await Users.findOneAndDelete({userID: userID})
    if(id==null|| id == undefined)
        throw new Error("Unable to delete user!")

    console.log("awd", id)
    return id
}
exports.getProductByID = async (userID) =>{

}

exports.getSiteManagerApproval = async (body) => {
    let Price, Qty;
    let totalVal = 0;
    let reqID;
    let empName;
    console.log("wdqq")
    for (const val of body) {
        totalVal = totalVal + (val.itemPrice * val.itemQty)
        reqID = val.reqID
        console.log("wdqq")

        empName = await userService.findEmployee(val.reqID)

    }
    const managerApprovedItems = await this.getTheStatus()
    console.log("CHECK", managerApprovedItems.length)
    console.log("totalVal", reqID)

    if(managerApprovedItems.length !== 0){
        await ApprovedService.saveAppOrReq(empName, managerApprovedItems);
        await ApprovedService.deletePendingItems(managerApprovedItems);
        return "APPROVE"

    }

    if(totalVal < 100000 ){
        await ApprovedService.saveAppOrReq(empName, body);
        await itemsService.deleteItemsWhenApproved(body)

        return "APPROVE"
    }else{
        console.log("TOTAL", reqID)
        await this.savePendingValue(reqID)
        await ApprovedService.deleteFromApprovedItems(reqID)
        await itemsService.deleteItemsWhenApproved(body)
        return "PENDING"
    }
}

exports.deleteItemsWhenReceived = async (body) => {
    let reqIDs = body.reqID
    let employeeName;
    employeeName = await userService.findEmployee( body.reqID)

    let {reqID, itemDescription} = body
    console.log("awdww",reqID, itemDescription)
    const items = await AppOrPending.find({"reqID":reqIDs[0]})
    console.log("ewe", itemDescription)
    let result;
    for (const data of items) {
        for(const da of itemDescription){
            if(da === data.itemDescription){
                console.log("RESSSS",data)
                const invoiceitm = await this.addReceivedItemsToInvoice(employeeName, data)
                result = await AppOrPending.findOneAndDelete({itemDescription: data.itemDescription})
            }
        }
    }
    return result
}

exports.declineRequestion = async (body) => {
    const {reqID} = body
    console.log("REQID",reqID)

    const declineReq = await items.deleteMany({ItemID:reqID})
    console.log("declineReq", declineReq.deletedCount);
    if(declineReq.deletedCount === 0)
        return null
    return "deleted"

}

exports.savePendingValue = async (reqID) => {

    const reqIDs = reqID
    console.log("HU",reqIDs)
    const peningItemsInfo = await items.find({ItemID: reqIDs})
    const result = await ApprovedService.savePendingItems(peningItemsInfo)
    console.log("PEN", peningItemsInfo)
}

exports.getTheStatusOfPendingStatus = async (reqID, status) => {

    console.log(reqID, status)
    const idset = await this.getALlPendingItemsId(reqID)
    for (const data of idset) {
        if(data.reqID === reqID){

            const result = await pendingItems.updateMany({"reqID": reqID}, {"status": status})
            console.log("wequhiuh",result)
        }
    }
}

exports.getTheStatus = async () => {

    const result = await pendingItems.find({"status":"APPROVED"})
    console.log("RES", result)
    return result
}

exports.getALlPendingItemsId = async (resID) => {
    const reuslt = await pendingItems.find({reqID:resID})
    console.log("MYS", reuslt)
    return reuslt
}

exports.addReceivedItemsToInvoice = async (employeeName, data) => {
    const items = []
        console.log("valuesa",data)
        const {reqID, itemDescription, itemPrice,itemQty, approvedUser} = data;

        console.log("BODY ITEMS",reqID, itemDescription, itemPrice,itemQty)
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
        console.log("reuslt111", result);
        return result;
}
