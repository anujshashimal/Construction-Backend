const express = require('express');
const router = express.Router();
const invoice = require('../services/invoice');

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
