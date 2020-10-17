const express = require('express');
const router = express.Router();
const invoice = require('../services/invoice');

//get all the invoice ids which are releated to orders
router.get('/getInvoiceIds',  async(req, res) => {
    try{
        const result = await invoice.getInvoiceIds()
        if(result.length === 0 || result === undefined)
            res.send({result:"EMPTY"})
        res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }
})

//get the invoice information by req id
router.post('/getInvoiceInfoById',  async(req, res) => {
    try{
        const body = req.body
        const result = await invoice.getInviceInfo(body)
        if(result.length === 0 || result === undefined)
            res.send({result:"EMPTY"})
        res.json(result)
    }catch (e) {
        res.send({description:e.message})

    }
})

module.exports=router;
