const express = require('express');
const router = express.Router();
const user = require('../services/user');

router.post('/registerUsers', async( req, res) => {
    try{
        const body = req.body;
        const userDet = await user.RegisterUsers(body);
        res.send(userDet);
        res.status(200).send("User Registered!");
    }catch (e){
        res.status(404).send("Error");
    }
})

router.post('/userLogin', async( req, res) => {
    try{
        const body = req.body;
        const users = await user.LoginUser(body);
        console.log("USERRR", users);
        res.send(users);
    }catch (e){
        res.status(404).send("User Not found");
    }
})

module.exports=router;
