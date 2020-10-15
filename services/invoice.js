let invoice = require('../models/Invoice');

exports.getInvoiceIds = async () => {
    const result = await invoice.find({}, {reqID:1})
    return result
}

exports.getInviceInfo = async (body) => {
    let OrderID, reqID, employeeName, approvedName;
    let itemsInfo = []
    let totalPrice = 0

    const result = await invoice.find({"reqID":body.invoiceID})
    result.forEach(data => {
        OrderID = data.OrderID,
        reqID = data.reqID,
        employeeName = data.employeeName,
        approvedName = data.approvedUser,
        itemsInfo.push({itemName:data.itemDescription, itemQty:data.itemQty, itemPrice:data.itemPrice})
        totalPrice = totalPrice + (data.itemQty * data.itemPrice)
    })

    return {OrderID, reqID,totalPrice,employeeName,approvedName,itemsInfo}
}
