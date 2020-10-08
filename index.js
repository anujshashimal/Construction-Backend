const express = require('express');
const app = express();
process.cwd()
require('dotenv').config()
const port = process.env.PORT || 3000;
const cors = require('cors');
const conn = require('./dbCon/Connection');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {userRouter, itemRouter, siteManagerRouter} = require('./routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/items', itemRouter);
app.use('/users', userRouter);
app.use('/siteManager', siteManagerRouter);

mongoose.connect(conn.database,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb database connection established successfully");
})
app.listen(port, function() {
    console.log("App is running on port " + port);
});
