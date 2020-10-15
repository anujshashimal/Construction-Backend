let Users = require('../models/user');
let Orders = require('../models/Order');
let items = require('../models/Items');
let approvedItems = require('../models/AppOrPenRequest')
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

    const data = await approvedItems.find({reqID: reqID})
    console.log("data", data)
    data.forEach(item => {
        ids.push(item.reqID)
    })


    return data
}
