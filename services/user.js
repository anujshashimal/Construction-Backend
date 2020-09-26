let Users = require('../models/user');
const { v1: uuidv1 } = require('uuid');

exports.RegisterUsers = async (body)=>{
    const {username, password, email,userType} = body;
    const userID = uuidv1();
    const  userDetails = new Users({
        userID,
        username,
        password,
        email,
        userType
    });
    const result = await userDetails.save();
    if(!result)
        throw new Error;
}

exports.LoginUser = async (body) => {
    const {username, password} = body;
    const dat = await Users.find({username: username, password:password})

    if(!dat[0])
        throw new Error;

    return dat[0]
}