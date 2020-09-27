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
        return Error

    return id

}