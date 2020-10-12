let Users = require('../models/user');
let Orders = require('../models/Order');

exports.getAllSuppliers = async(userType) => {
    const dat = await Users.find({userType: userType})
    if(!dat)
        throw new Error("Unable to find suppliers");
    return dat;
}

exports.getSuppliersItems = async (body) => {
    const reqIDs = body.reqID
    const data = await Orders.find({reqID: reqIDs})
        if(!data || data == undefined|| data.length ==0)
            throw new Error("Unable to find items!")
    return data
}
