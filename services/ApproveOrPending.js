let AppOrPending = require('../models/AppOrPenRequest');
let PendingItems = require('../models/PendingItems');

exports.saveAppOrReq = async (body)=>{
    console.log("BOD",body)
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty, status;
     for (const data of body) {
            reqID = data.reqID,
            itemDescription = data.itemDescription,
            itemPrice = data.itemPrice,
            itemQty= data.itemQty
            status = "APPROVED",
            console.log("HH", reqID, itemDescription,itemPrice,itemQty)

        const coll = new AppOrPending({
            reqID,
            itemDescription,
            itemPrice,
            itemQty,
            status
        })

        const result = await coll.save().then(()=> {console.log("Success!")})
        console.log("adawdaw", result)

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

        console.log("HH", reqID, itemDescription,itemPrice,itemQty)

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
    console.log("MY",body)
    for (const data of body) {

                result = await PendingItems.findOneAndDelete({"reqID": data.reqID, "status":"APPROVED"})

    }
    return result

}
