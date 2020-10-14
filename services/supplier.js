let Users = require('../models/user');
let Orders = require('../models/Order');
let items = require('../models/Items');
const path = require('path');
const nodemailer = require("nodemailer");
const process = require('process');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const ABSPATH = path.dirname(process.mainModule.filename)

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sliitfashionwebapp@gmail.com",
        pass: "sliit@123"
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
    const getSupplierEmail = await Users.find({username:supplier})
    getSupplierEmail.forEach(data => {Supplieremail = data.email})
    const orderInfo = await items.find({ItemID:reqID})

    // console.log("Order Info", orderInfo[0].Item_Description)

    let sentinfo = {
        to: Supplieremail,
        subject: "Order is Pending",
        html:
            '<form style="background-color: #ffffff" ' +
            '<h2> Hi ' + '</h2>' +
            ', </h1> <br /> <br />' + ' <img src="cid:Design01" style="width: 500px" /> ' + ' <br /> <br />' +
            '<p> You got a new order! Please deliver before the deadline  </p>' +
            '<h2> Order Details </h2>' + '</br>' +
            '<h3> Name :' + 'Lahiru Lakruwan' + '</h3>' + '</br>' +
            '<h3> Address Line 1 :' + body.addressline1 + '</h3>' + '</br>' +
            '<h3> Address Line 2 :' + body.addressline2 + '</h3>' + '</br>' +
            '<h3> Address Line 3 :' + body.other + '</h3>' + '</br>' +
            '<h3> Required Date' + body.requiredDate + '</h3>' + '</br>' +
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
