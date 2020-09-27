let Users = require('../models/user');


exports.getAllSiteManagers = async(userType) => {
    console.log("dasst", userType)
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