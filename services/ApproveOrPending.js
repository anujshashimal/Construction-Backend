let AppOrPending = require('../models/AppOrPenRequest');

exports.saveAppOrReq = async (body)=>{
    console.log("BOD",body)
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty;
     for (const data of body) {
            reqID = data.reqID,
            itemDescription = data.itemDescription,
            itemPrice = data.itemPrice,
            itemQty= data.itemQty
            console.log("HH", reqID, itemDescription,itemPrice,itemQty)

        const coll = new AppOrPending({
            reqID,
            itemDescription,
            itemPrice,
            itemQty
        })

        const result = await coll.save().then(()=> {console.log("Success!")})
        console.log("adawdaw", result)

    }


}
