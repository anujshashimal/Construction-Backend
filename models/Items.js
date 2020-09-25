const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Itemss = new Schema({

    ItemID:{
        type:String,
        required:true
    },
    Item_Description:{
        type:String,
        required:true
    },
    Item_Quantity:{
        type:String,
        required:true
    },
    Item_AgreedPrice:{
        type:String,
        required:true
    },


});

const Items = mongoose.model('Items',Itemss);

module.exports = Items;