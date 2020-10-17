let pendingItems = require('../models/PendingItems');

exports.declineRequestion = async (body) => {
    try{
    const {reqID} = body
    const declineReq = await pendingItems.deleteMany({reqID:reqID})
    if(declineReq.deletedCount === 0)
        return null
    return "deleted"
    }catch (e) {
        throw new Error(e)
    }
}
