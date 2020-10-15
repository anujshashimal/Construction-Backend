const express = require('express');
const router = express.Router();
const siteManager = require('../services/siteManager');
const order = require('../services/order');
const supplier = require('../services/supplier')
//get all site managers
router.get('/getSiteManagers', async( req, res) => {
    try{
        const userType = "sitemanager";
        const userDet = await siteManager.getAllSiteManagers(userType);
        console.log("awdawd", userDet)

        res.json(userDet);
    }catch (e){
        res.status(404).send({description:e.message})
    }
})

//get site manager by ID
router.get('/:userID', async( req, res) => {
    try{
        const userType = "sitemanager";
        const {userID} = req.params;
        const userDet = await siteManager.getSiteManagerById(userID, userType);
        res.json(userDet);

    }catch (e){
        res.send({description:e.message})
    }
})

//update sitemanager profile by id
router.post('/updateProfile/:userID', async( req, res) => {
    try{
        const {userID} = req.params;
        console.log("aed", req.body)
        const userDet = await siteManager.updateSiteMnagerById(userID, req.body);
        res.json(userDet);

    }catch (e){
        res.send({description:e.message})
    }
})


router.post('/deleteProfile/:userID', async( req, res) => {
    try{
        const {userID} = req.params;
        const userDet = await siteManager.deleteSiteManagerByID(userID);
        res.json(userDet);

    }catch (e){
        res.send({description:e.message})
    }
})

router.get('/getSitemanager/product', async (req, res) => {

    try{
        const {userID} = req.name;
        const reuslt = await siteManager.getProductByID();
        res.json(result)
    }catch (e) {
        res.send({description:e.message})
    }

})

//approve/decline request
router.post('/approveReq', async(req, res) => {
    try{
        const body = req.body
        console.log("MEEE", body)
        const status = await siteManager.getSiteManagerApproval(body);
        res.json({status});

    }catch (e) {
        res.send({description:e.message})
    }
})

//Place purchase orders
router.post('/placeorders', async(req, res) => {
    try{
        const body = req.body
        await order.saveOrderItems(body)
        await supplier.getSupplierEmail(body.supplier, body.reqID, body);
        res.json({result:"Saved Order details in the DB"})
    }catch (e) {
        res.send({description:e.message})
    }
})

//get All Approve Orders By Req ID
router.post('/getPlaceOrders', async(req, res) => {
    try{
        const body = req.body;
        const result = await order.getPlaceOrderDetails(body)
        res.json(result);
    }catch (e) {
        res.send({description:e.message})
    }
})

//get All ReqId when Supplier approved
router.post('/getAllOrdersReqIds', async(req, res) => {
    try{
        const result = await order.FindAllItemsReqIdByOrderCollection()
        res.json({result})
    }catch (e) {
        res.send({description:e.message})
    }
})

router.post('/deleteReceivedItems', async (req, res) => {
    try{
        const body = req.body;
        console.log("reuwwslt",body)

        const result = await siteManager.deleteItemsWhenReceived(body)
        console.log("reuslt",result)
        if(result === undefined)
            res.send(null)
        res.send({result})
    }catch (e) {
        res.send({description:e.message})
    }
})


//sitemanager decline request
router.post('/declineRequest', async (req, res) => {
    try{
        const body = req.body;
        const result =  await siteManager.declineRequestion(body)
        console.log("result",result)
        if(result === undefined|| result === null)
            res.send({result:"Requesting ID is invlaid"})
        res.json({result})
    }catch (e) {
        res.send({description:e.message})
    }
})

module.exports=router;
