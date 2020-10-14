let pendingItems = require('../models/PendingItems');

exports.declineRequestion = async (body) => {
    const {reqID} = body
    console.log("REQID",reqID)

    const declineReq = await pendingItems.deleteMany({reqID:reqID})
    console.log("declineReq", declineReq.deletedCount);
    if(declineReq.deletedCount === 0)
        return null
    return "deleted"

}
