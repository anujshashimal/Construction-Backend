const express = require('express');
const router = express.Router();
const items = require('../services/Items');

router.post('/addItems', async( req, res) => {
    try{
        const body = req.body;
        await items.SaveItems(body);
        res.status(200).send("Item Added");
    }catch (e){
        res.send({description:e.message})
    }
})

router.post('/getItemsByUser', async (req, res) => {
    try{
        const body = req.body;
        let itemsArray = [];
        itemsArray = await items.getItemByUser(body);
        res.send(itemsArray);
    }catch (e){
        res.send({description:e.message})
    }
})

router.get('/health', async( req, res) => {
    try{
        res.status(200).send("passes");
    }catch (e){
        res.send({description:e.message})
    }
} )

router.get('/getRequestingNumberList', async( req, res) => {
    try{
        const reqIDs = await items.getAllByReqNumber();
        res.json(reqIDs);
    }catch (e){
        res.send({description:e.message})
    }
})

router.post('/getItemsByReqNumbers', async (req, res) => {
    try{
        const body = req.body;
        const itemsDet = await items.getAllItemsByReqNumber(body);
        res.json(itemsDet);
    }catch (e) {
        res.send({description:e.message})
    }

})

module.exports=router;
