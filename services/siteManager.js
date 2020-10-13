let Users = require('../models/user');
let AppOrPending = require('../models/AppOrPenRequest');


exports.getAllSiteManagers = async(userType) => {
    const dat = await Users.find({userType: userType})
    if(!dat)
        return Error;
    return dat;
}

exports.getSiteManagerById = async (userID, userType) => {
    const id = await Users.find({userID: userID,userType:userType })
    if(id === null)
        throw new Error("Unable to find user!")
    return id
}

exports.updateSiteMnagerById = async (userID, body) => {
    console.log("here", userID)

    const id = await Users.findOneAndUpdate({userID: userID}, body)
    if(id==null|| id == undefined)
        throw new Error("Unable to find user!")

    console.log("awd", id)
    return id
}

exports.deleteSiteManagerByID = async (userID) => {
    console.log("here", userID)

    const id = await Users.findOneAndDelete({userID: userID})
    if(id==null|| id == undefined)
        throw new Error("Unable to delete user!")

    console.log("awd", id)
    return id
}
exports.getProductByID = async (userID) =>{

}

exports.getSiteManagerApproval = async (body) => {
    let Price, Qty;
    let totalVal = 0;
    body.forEach(val => {
        totalVal = totalVal + (val.itemPrice * val.itemQty)
    })
    console.log("totalVal", totalVal)
    if(totalVal > 100000){
        return "PENDING"
    }else{
        return "APPROVE"
    }
}

exports.deleteItemsWhenReceived = async (body) => {

    let {reqID, itemDescription} = body
    console.log("awdww",reqID, itemDescription)
    const items = await AppOrPending.find({"reqID":reqID})
    console.log("ewe", itemDescription)
    let result;
    for (const data of items) {
        for(const da of itemDescription){
            if(da === data.itemDescription){
                result = await AppOrPending.findOneAndDelete({itemDescription: data.itemDescription})
            }
        }
    }
    return result

}
