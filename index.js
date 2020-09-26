const express = require('express');
const app = express();
require('dotenv')
// const port = process.env.port;
const port = 3000;
const cors = require('cors');
const conn = require('./dbCon/Connection');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {userRouter, itemRouter} = require('./routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/items', itemRouter);
app.use('/users', userRouter);

mongoose.connect(conn.database,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongodb database connection established successfully");
})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})