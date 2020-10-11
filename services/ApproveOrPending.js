let AppOrPending = require('../models/AppOrPenRequest');

exports.saveAppOrReq = async (body)=>{
    console.log("BOD",body)
    let arr = []
    let reqID, itemDescription,itemPrice,itemQty;

    body.forEach(data => {
            reqID = data.reqID,
            itemDescription= data.itemDescription,
            itemPrice = data.itemPrice,
            itemQty= data.itemQty

        const coll = new AppOrPending({
            reqID,
            itemDescription,
            itemPrice,
            itemQty
        })

        const result = coll.save().then(()=> {console.log("Success!")})
        console.log("adawdaw", result)

    })


}
