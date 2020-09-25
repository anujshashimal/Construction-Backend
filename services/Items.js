let Items = require('../models/Items');

exports.SaveItems = (body)=>{

    const ItemID = body.ItemID;
    const Item_Description = body.Item_Description;
    const Item_Quantity = body.Item_Quantity;
    const Item_AgreedPrice = body.Item_AgreedPrice;

    const  newCategory = new Items({
        ItemID,
        Item_Description,
        Item_Quantity,
        Item_AgreedPrice
    });
    newCategory.save().then(()=> {console.log("Success!")})

}