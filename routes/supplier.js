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

router.post('/getAllItemsBySupplierID', async (req, res) => {
    try{
        const reqID = req.body
        const result = await supplier.getSuppliersItems(reqID)
        res.json(result)
    }catch (e) {
        res.send({description:e.message})

    }

})

module.exports=router;
