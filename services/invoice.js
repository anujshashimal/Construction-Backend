let invoice = require('../models/Invoice');


exports.getInvoiceIds = async () => {
    const result = await invoice.find({}, {OrderID:1})
    return result
}

exports.getInviceInfo = async (body) => {
    let OrderID, reqID;
    let itemsInfo = []
    let totalPrice = 0
    const result = await invoice.find({"reqID":body.invoiceID})
    result.forEach(data => {
        OrderID = data.OrderID,
        reqID = data.reqID
        itemsInfo.push({itemName:data.itemDescription, itemQty:data.itemQty, itemPrice:data.itemPrice})
        totalPrice = totalPrice + (data.itemQty * data.itemPrice)
    })

    return {OrderID, reqID,itemsInfo,itemsInfo}
}
