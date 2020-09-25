const express = require('express');
const router = express.Router();
const items = require('../services/Items');

router.post('/addItems', async( req, res) => {
    try{
        const body = req.body;
        items.SaveItems(body);
        res.status(200).send("passes");
    }catch (e){
        res.status(404).send("passes");
    }
} )
module.exports=router;
