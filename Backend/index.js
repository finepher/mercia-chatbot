const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//socket connect//
const {Server} = require('socket.io');

const socket = new Server(3001,{
    cors: "*"
})

socket.on("connection",(socketConnection)=>{
    // console.log("<<connected")

    socketConnection.on("chat_message",async(data)=>{
        console.log(data, "<<message received")               
                
    })                 
})

// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})

