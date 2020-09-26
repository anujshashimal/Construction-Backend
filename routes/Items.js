const express = require('express');
const router = express.Router();
const items = require('../services/Items');

router.post('/addItems', async( req, res) => {
    try{
        const body = req.body;
        await items.SaveItems(body);
        res.status(200).send("Item Added");
    }catch (e){
        res.status(404).send("Error");
    }
})

router.get('/getItemsByUser', async (req, res) => {
    try{
        const body = req.body;
        let itemsArray = [];
        itemsArray = await items.getItemByUser(body);
        res.send(itemsArray);
        res.status(200).send("Item Fetched!");
    }catch (e){
        console.log(e)
    }

})

router.get('/health', async( req, res) => {
    try{
        res.status(200).send("passes");
    }catch (e){
        res.status(404).send("failed");
    }
} )
module.exports=router;
