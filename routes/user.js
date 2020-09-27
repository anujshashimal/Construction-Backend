const express = require('express');
const router = express.Router();
const user = require('../services/user');

//Register as sitemanager, and supplier
router.post('/registerUsers', async( req, res) => {
    try{
        const body = req.body;
        await user.RegisterUsers(body);
        res.status(200).send("success!")
    }catch (e){
        res.status(404).send({description:e.message})
    }
})

//login as sitemanager and supplier
router.post('/userLogin', async( req, res) => {
    try{
        const body = req.body;
        const users = await user.LoginUser(body);
        console.log("USERRR", users);
        res.json(users);
    }catch (e){
        res.status(404).send({description:e.message})
    }
})

module.exports=router;
