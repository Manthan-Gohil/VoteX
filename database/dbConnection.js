const mongoose = require('mongoose');
const addData = require('../models/addData');
async function dbConnection(){

    await mongoose
        .connect(
            process.env.MONGO_URI,
            {
                dbName: "Backend_Tutorial",
            }
        )
        .then(async ()=>{
            console.log("Successfully Connected To Database.");
            // await addData();
        })
        .catch((err)=>{
            console.log(`Some error occured while connecting to database: ${err}`);
        });
};

module.exports = dbConnection;