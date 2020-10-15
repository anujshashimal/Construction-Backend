let Items = require('../models/Items');
let User = require('../models/user');
let PendingItems = require('../models/PendingItems');

exports.SaveItems = async (body)=>{

    const {username,ItemID, Item_Description,Item_Quantity,Item_AgreedPrice} = body;

    const  newCategory = new Items({
        username,
        ItemID,
        Item_Description,
        Item_Quantity,
        Item_AgreedPrice
    });
    const result = await newCategory.save().then(()=> {console.log("Success!")})
}

exports.getItemByUser = async (body) => {
    const {username} = body;
    let items = [];
    items = await Items.find({"username":username})
    if(!items)
        throw new Error("Item not found")

    return items
}

exports.getAllByReqNumber = async () => {
    let items = []
    const dat = await Items.find({}, {ItemID:1})
    dat.forEach(data => items.push(data.ItemID))
  //  dat.forEach(data => {resIDs.push(data.userID)})
    return dat;
}

exports.getAllItemsByReqNumber = async (body) => {
    const {ItemID} = body;
    let items = [];
    console.log(ItemID)
    items = await Items.find({"ItemID":ItemID})
    return items

}

exports.getAllPendingReqItems = async () => {
    const dat = await PendingItems.find({}, {reqID:1})
    return dat;
}


exports.getPendingItemByReqId = async (body) => {
    const {reqID} = body;
    let items = [];
    items = await PendingItems.find({"reqID":reqID})
    return items

}


exports.deleteItemsWhenApproved = async (body) => {
    let result;
    let reqID;
    for (const data of body) {
        result = await Items.deleteMany({ItemID:data.reqID})
    }
    return result
}
