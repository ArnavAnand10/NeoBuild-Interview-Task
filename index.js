
const express = require('express');
const dbConnection = require('./Database/dbConnection');
const app = express();
const router = require('./Routes/routes');
const router2 = require('./Routes/protectedRoutes');

require('dotenv').config();
var cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(router)
app.use("/protected",router2)



PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}`);
    
})

// connecting to MongoDB:

dbConnection();