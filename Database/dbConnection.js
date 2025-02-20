const mongoose = require('mongoose');


const dbConnection = async()=>{
    try{
        db_uri = process.env.DB_URI;
        await mongoose.connect(db_uri);
        console.log("Database connection successfull!")
    }catch(e){
        console.log(`error occured while connecting to MongoDB: ${e}`);
         
        
    }
}

module.exports = dbConnection;