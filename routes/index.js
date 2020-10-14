const itemRouter= require('./Items');
const userRouter = require('./user');
const siteManagerRouter = require('./siteManager');
const supplier = require('./supplier');
const manager = require('./manager');
const invoice = require('./invoice');

module.exports ={
    itemRouter,
    userRouter,
    siteManagerRouter,
    supplier,
    manager,
    invoice
}
