
const mongoose = require('mongoose')
require('dotenv').config();
const dbconnection = process.env.MONGODB_CONNECTION

mongoose.connect(dbconnection,{
}).then(()=> console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})
