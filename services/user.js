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
    const usernmeExits = await this.FindUser(username);
    console.log(usernmeExits)
    if(usernmeExits.length == 0){
        if(userType === "sitemanager"|| userType === "employee" || userType ==="supiler"){
            const result = await userDetails.save();
            return result
        }else{
            throw new Error("Username Type is invlaid")

        }

    }
    throw new Error("Username already exists!")

}

exports.LoginUser = async (body) => {
    const {username, password} = body;
    const dat = await Users.find({username: username, password:password})

    if(!dat[0])
        throw new Error;

    return dat[0]
}

exports.FindUser = async (username) =>{
    let usernameList = [];
    const dat = await Users.find({username: username})
    dat.forEach(data => usernameList.push(data.username));
    return usernameList;
}