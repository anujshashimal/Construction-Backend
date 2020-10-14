const express = require('express');
const router = express.Router();
const siteManager = require('../services/siteManager');
const order = require('../services/order');
const supplier = require('../services/supplier');

router.post('/placeorders', async(req, res) => {
    try{
        const body = req.body
        await order.managerSaveOrderItems(body)
        await supplier.getSupplierEmail(body.supplier, body.reqID, body);
        res.json({reuslt:"Saved Order details in the DB"})
    }catch (e) {
        res.send({description:e.message})
    }
})
