let Users = require('../models/user');
let Orders = require('../models/Order');
let items = require('../models/Items');
let approvedItems = require('../models/AppOrPenRequest');
let SupplierPending = require('../models/SupplierPending');
let supplierItems = require('../models/SupplierItems');

const path = require('path');
const nodemailer = require("nodemailer");
const process = require('process');

const {SupplierConst} = require('../Constants');
const {
    INDUSTRY_EMAIL,
    INDUSTRY_PASSWORD
} = SupplierConst

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const ABSPATH = path.dirname(process.mainModule.filename)

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: INDUSTRY_EMAIL,
        pass: INDUSTRY_PASSWORD
    },
});

exports.saveItemsInSupplierTable = async (empName, body)=>{
    console.log("BOD",body)
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty, status,approvedUser,employeeName;
    for (const data of body) {
            reqID = data.reqID,
            itemDescription = data.itemDescription,
            itemPrice = data.itemPrice,
            itemQty= data.itemQty
            status = "WAITING",
            approvedUser = data.username,
            employeeName = empName
        console.log("HH", reqID, itemDescription,itemPrice,itemQty)

        const coll = new supplierItems({
            reqID,
            itemDescription,
            itemPrice,
            itemQty,
            status,
            approvedUser,
            employeeName
        })
        const result = await coll.save().then(()=> {console.log("Success!")})
    }
}

exports.getAllSuppliers = async(userType) => {
    const dat = await Users.find({userType: userType})
    if(!dat)
        throw new Error("Unable to find suppliers");
    return dat;
}

exports.getSuppliersItems = async (body) => {
    const reqIDs = body.reqID
    const data = await Orders.find({reqID: reqIDs})
        if(!data || data == undefined|| data.length ==0)
            throw new Error("Unable to find items!")
    return data
}

exports.getSupplierEmail = async(supplier, reqID, body) => {
    let Supplieremail;
    let OrderInfo;
    let Item_Description = [];
    let Item_Quantity = [];
    let Item_AgreedPrice = [];
    let username;
    const getSupplierEmail = await Users.find({username:supplier})
    getSupplierEmail.forEach(data => {Supplieremail = data.email})
    const orderInfo = await approvedItems.find({reqID:reqID})

    // console.log("Order Info", orderInfo[0].Item_Description)
    orderInfo.forEach(data => {
        Item_Description.push(data.itemDescription)
        Item_Quantity.push(data.itemQty)
        Item_AgreedPrice.push(data.itemPrice)
        username = data.employeeName
    })
    let sentinfo = {
        to: Supplieremail,
        subject: "Order is Pending",
        html:
            '<form style="background-color: #ffffff" ' +
            '<h2> Hi ' + '</h2>' +
            ', </h1> <br /> <br />' + ' <img src="cid:Design01" style="width: 500px" /> ' + ' <br /> <br />' +
            '<p> You got a new order! Please deliver before the deadline  </p>' +
            '<h2> Order Details </h2>' + '</br>' +
            '<h3> Sitemanager Name :' + username + '</h3>' + '</br>' +
            '<h3> Address Line 1 :' + body.addressline1 + '</h3>' + '</br>' +
            '<h3> Address Line 2 :' + body.addressline2 + '</h3>' + '</br>' +
            '<h3> Address Line 3 :' + body.other + '</h3>' + '</br>' +
            '<h3> Required Date :' + body.requiredDate + '</h3>' + '</br>' +
            '<h3> ***********  ORDERED ITEMS ********</h3>' +
            `<h2>${Item_Description},</h2>` +
            `<h2>${Item_Quantity},</h2>` +
            `<h2>${Item_AgreedPrice},</h2>` +
            '<h3> ************************************ </h3>' +
            '</form>',
        attachments: [{
            filename: 'Design01.png',
            path: ABSPATH + "/Design01.png",
            cid: 'Design01'
        }]
    }
    transporter.sendMail(sentinfo, (err, object) => {
        if (err) {
            console.log(err);
        } else {
            console.error("SENT ");
        }
    })
}
exports.getSupplierItemsByName = async (username) => {
    let ids = [];
    let uniqueArray = [];

    const data = await Orders.find({supplier: username})
    data.forEach(item => {
        ids.push(item.reqID)
    })
    uniqueArray = ids.filter(function(item, pos) {
        return ids.indexOf(item) == pos;
    })

    return uniqueArray
}

exports.getItemsBySupplierReqIds = async (reqID) => {
    let ids = [];
    let uniqueArray = [];
    console.log("data")
    let addressLine1, addressLine2, requiredDate, approvedUser;


    const data = await supplierItems.find({reqID: reqID})
    console.log("data", data)
    data.forEach(item => {
        addressLine1 = item.addressline1,
            addressLine2 = item.addressLine2,
            requiredDate = item.requiredDate,
            approvedUser = item.approvedUser

    })

    return data
}

exports.getSelectedItemsBySupplierReqIds = async (itemDescription,reqID) => {
    try{
    let ids = [];
    let uniqueArray = [];
    // const orderInfo = await Orders.find({reqID:reqID})

        for (var i = 0; i < itemDescription.length; i++) {
            var obj = itemDescription[i]
            console.log("desssffffffff", obj);

            const data = await supplierItems.find({reqID: reqID[0], itemDescription: obj})
            const val = await this.saveSupplierPendingValue(data);
            await SupplierPending.updateMany({reqID:reqID[0],itemDescription: obj}, {status:"WAITING"})
            await supplierItems.deleteMany({itemDescription: obj})

            data.forEach(item => {
                ids.push(item.reqID)
            })
        }
        return ids;

    }catch (e) {
        console.log("Error",e)
    }
}

exports.saveSupplierPendingValue = async (data) => {
    console.log("adw", data)
    let result;
    let status = "WAITING"
    try{
    for (const item of data) {
    const {reqID, itemDescription, itemPrice,itemQty, approvedUser, addressline1, addressline2, other, requiredDate} = item;
    const  orderDetails = new SupplierPending({
        // OrderID,
        reqID,
        itemDescription,
        itemPrice,
        itemQty,
        approvedUser,
        addressline1,
        addressline2,
        other,
        requiredDate,
        status
    });
        result = await orderDetails.save().then(()=> {console.log("Success!")})
    }

    return result;
    }catch (e) {
        console.log("Error", e)
    }
    }
exports.getPendingOrderList = async (reqID) => {
    let uniqueArr = [];
    const result = await SupplierPending.find({reqID: reqID})
    console.log(result)

    uniqueArray = result.filter(function(item, pos) {
        return result.indexOf(item) == pos;
    })

    return result
}

exports.getPendingOrderListIds = async () => {
    let reqIds = []
    let uniqueArray = [];

    const result = await SupplierPending.find({status:"WAITING"})

    result.forEach(data => {
        reqIds.push(data.reqID)
    })

    uniqueArray = reqIds.filter(function(item, pos) {
        return reqIds.indexOf(item) == pos;
    })
    return {result:uniqueArray}

}

exports.getDeliveredOrderListIds = async () => {
    let reqIds = []
    let uniqueArray = [];

    const result = await SupplierPending.find({status:"DELIVERED"})

    result.forEach(data => {
        reqIds.push(data.reqID)
    })

    uniqueArray = reqIds.filter(function(item, pos) {
        return reqIds.indexOf(item) == pos;
    })
    return {result:uniqueArray}
}

exports.getPendingOrderInfoyIds = async (reqID) => {
    let reqIds = []
    let uniqueArray = [];

    const result = await SupplierPending.find({reqID:reqID,status:"WAITING"})


    return result
}

exports.getDeliveredOrderIds = async (reqID) => {

    const result = await SupplierPending.find({reqID:reqID,status:"DELIVERED"})


    return result
}

exports.getDeliveredOrderInfoyIds = async () => {

    let reqIds = []
    let uniqueArray = [];

    const result = await SupplierPending.find({status:"DELIVERED"})

    result.forEach(data => {
        reqIds.push(data.reqID)
    })

    uniqueArray = reqIds.filter(function(item, pos) {
        return reqIds.indexOf(item) == pos;
    })
    return {result:uniqueArray}

}
