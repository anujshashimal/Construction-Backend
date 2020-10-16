const express = require('express');
const router = express.Router();
const siteManager = require('../services/siteManager');
const order = require('../services/order');
const appOrPending = require('../services/ApproveOrPending');
const supplier = require('../services/supplier');

//get all site managers
router.get('/getSuppliers', async( req, res) => {
    try{
        const userType = "supplier";
        const userDet = await supplier.getAllSuppliers(userType);

        res.json(userDet);
    }catch (e){
        res.send({description:e.message})
    }
})

router.post('/getAllInfoBySupplierName', async (req, res) => {
    try{
        const reqID = req.body
        const result = await supplier.getSuppliersItems(reqID)
        res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }
})

router.post('/getAllItemsBySupplierName', async (req, res) => {
    try{
        const {username} = req.body
        console.log(username)
        const result = await supplier.getSupplierItemsByName(username)
        res.json({result})
    }catch (e) {
        res.send({description:e.message})
    }
})

router.post('/getInfo', async (req, res) => {
    try{
        const {reqID} = req.body
        console.log("sefw")

        const result = await supplier.getItemsBySupplierReqIds(reqID)
        res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }
})

router.post('/getSelectedInfo', async (req, res) => {
    try{
        console.log(req.body)
        const {itemDescription,reqID} = req.body
        const result = await supplier.getSelectedItemsBySupplierReqIds(itemDescription,reqID)
        res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }
})

router.get('/getPendingOrderListIds', async (req, res) => {
    try{
    const result = await supplier.getPendingOrderListIds()
    res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }
})

module.exports=router;
