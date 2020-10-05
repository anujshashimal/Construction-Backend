let Items = require('../models/Items');
let User = require('../models/user');

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
    console.log("adaw", result)
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
    let resIDs = [];
    const dat = await User.find({}, {userID:1})
    dat.forEach(data => {resIDs.push(data.userID)})
    return resIDs;
}

exports.getAllItemsByReqNumber = async (body) => {
    const {ItemID} = body;
    let items = [];
    console.log(ItemID)
    items = await Items.find({"ItemID":ItemID})

    return items

}
