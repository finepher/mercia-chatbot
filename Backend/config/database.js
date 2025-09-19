const mongoose = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();


const connectDB = async ()=>{
    
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Mercia", 
        });
        console.log(`☑️  MongoDB Connected`);
    } catch (error) {
        console.log(`❌ Database connection failed: ${error.message}`);
    }
}

module.exports = connectDB;