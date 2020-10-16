const path = require('path');
const nodemailer = require("nodemailer");
const process = require('process');
const ABSPATH = path.dirname(process.mainModule.filename)

const {SupplierConst} = require('../Constants');
const {
    INDUSTRY_EMAIL,
    INDUSTRY_PASSWORD
} = SupplierConst

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: INDUSTRY_EMAIL,
        pass: INDUSTRY_PASSWORD
    },
});

exports.sendEmailWhenReceivedItems = async (items) => {
    console.log(items)
    let username;
    let Item_Description = [];
    let Item_Quantity = [];
    let Item_AgreedPrice = [];

    items.forEach(data => {
        Item_Description.push(data.itemDescription)
        Item_Quantity.push(data.itemQty)
        Item_AgreedPrice.push(data.itemPrice)
        username = data.employeeName
    })

    let sentinfo = {
        to: 'anujshashimal456@gmail.com',
        subject: "Order is successfully delivered!",
        html:
            '<form style="background-color: #ffffff" ' +
            '<h2> Hi ' + '</h2>' +
            ', </h1> <br /> <br />' + ' <img src="cid:Design01" style="width: 500px" /> ' + ' <br /> <br />' +
            '<p> Your order is successfully delivered!  </p>' +
            '<h2> Order Details </h2>' + '</br>' +
            // '<h3> Sitemanager Name :' + username + '</h3>' + '</br>' +
            // '<h3> Address Line 1 :' + body.addressline1 + '</h3>' + '</br>' +
            // '<h3> Address Line 2 :' + body.addressline2 + '</h3>' + '</br>' +
            // '<h3> Address Line 3 :' + body.other + '</h3>' + '</br>' +
            // '<h3> Required Date :' + body.requiredDate + '</h3>' + '</br>' +
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
