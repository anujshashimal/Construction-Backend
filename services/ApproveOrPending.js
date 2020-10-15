let AppOrPending = require('../models/AppOrPenRequest');
let PendingItems = require('../models/PendingItems');

exports.saveAppOrReq = async (empName, body)=>{
    console.log("BOD",body)
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty, status,approvedUser,employeeName;
     for (const data of body) {
            reqID = data.reqID,
            itemDescription = data.itemDescription,
            itemPrice = data.itemPrice,
            itemQty= data.itemQty
            status = "APPROVED",
            approvedUser = data.username
            employeeName = empName
            console.log("HH", reqID, itemDescription,itemPrice,itemQty)

        const coll = new AppOrPending({
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


exports.savePendingItems = async (body)=>{
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty, status;
    for (const data of body) {
            reqID = data.ItemID,
            itemDescription = data.Item_Description,
            itemPrice = data.Item_AgreedPrice,
            itemQty= data.Item_Quantity
            status = "PENDING"

        const coll = new PendingItems({
            reqID,
            itemDescription,
            itemPrice,
            itemQty,
            status
        })

        const result = await coll.save().then(()=> {console.log("Success!")})

    }
}

exports.deletePendingItems = async (body) => {
    let result;
    let reqID;
    for (const data of body) {
        result = await PendingItems.findOneAndDelete({"reqID": data.reqID, "status":"APPROVED"})
    }
    return result
}

exports.deleteFromApprovedItems = async (body) => {
    let result;
    let reqID;
    for (const data of body) {
        result = await AppOrPending.findOneAndDelete({"reqID": data.reqID, "status":"APPROVED"})
    }
    return result
}
