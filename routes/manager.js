const express = require('express');
const router = express.Router();
const siteManager = require('../services/siteManager');
const order = require('../services/order');
const supplier = require('../services/supplier');
const manager = require('../services/Manager');

//Manager decline request
router.post('/declineRequest', async (req, res) => {
    try{
        const body = req.body;
        const result =  await manager.declineRequestion(body)
        console.log("result",result)
        if(result === undefined|| result === null)
            res.send({result:"Requesting ID is invlaid"})
        res.json({result})
    }catch (e) {
        res.send({description:e.message})
    }
})

//update the status
router.post('/approval', async(req, res) => {
    try{
        const {reqID, status} = req.body
        await siteManager.getTheStatusOfPendingStatus(reqID, status)
        res.json({reuslt:"Items Approved"})
    }catch (e) {
        res.send({description:e.message})
    }
})


module.exports=router;

