const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Items = new Schema({

    username:{
        type:String,
    },
    ItemID:{
        type:String,
    },
    Item_Description:{
        type:String,
    },
    Item_Quantity:{
        type:String,
    },
    Item_AgreedPrice:{
        type:String,
    },


});

const ItemsModel = mongoose.model('Items',Items);

module.exports = ItemsModel;