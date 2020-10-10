const express = require('express');
const router = express.Router();
const siteManager = require('../services/siteManager');

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
        res.status(404).send({description:e.message})
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
        res.status(404).send({description:e.message})
    }
})


router.post('/deleteProfile/:userID', async( req, res) => {
    try{
        const {userID} = req.params;
        const userDet = await siteManager.deleteSiteManagerByID(userID);
        res.json(userDet);

    }catch (e){
        res.status(404).send({description:e.message})
    }
})

router.get('/getSitemanager/product', async (req, res) => {

    try{
        const {userID} = req.name;
        const reuslt = await siteManager.getProductByID();
        res.json(result)
    }catch (e) {
        res.json(404).send({description:e.message})
    }

})

//approve/decline request
router.post('/approveReq', async(req, res) => {
    try{
        const body = req.body
        console.log("BODYITEM",body)

        const status = await siteManager.getSiteManagerApproval(body);
        console.log({status})
        res.json({status});

    }catch (e) {
        res.json(404).send({description:e.message})
    }
})

//Place purchase orders
router.post('/placeorders', async(req, res) => {
    try{
        const body = req.body
        console.log("BODYITEM",body)

    }catch (e) {
        res.json(404).send({description:e.message})
    }
})
module.exports=router;
