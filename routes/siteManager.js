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
        res.status(404).send("Error");
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
        res.status(404).send("Error");
    }
})

//update sitemanager profile by id
router.get('/:userID', async( req, res) => {
    try{
        const userType = "sitemanager";
        const {userID} = req.params;
        const userDet = await siteManager.getSiteManagerById(userID, userType);
        res.json(userDet);

    }catch (e){
        res.status(404).send("Error");
    }
})

module.exports=router;
