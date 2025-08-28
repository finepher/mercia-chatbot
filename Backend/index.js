const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { GoogleGenAI } = require("@google/genai");

const {Server} = require('socket.io');

const socket = new Server(3001,{
    cors: "*"
})

socket.on("connection",(socketConnection)=>{
    // console.log("<<connected")

    socketConnection.on("chat_message",async(data)=>{
        console.log(data, "<<message received")

        // ai api settings
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: data,
      });
        
            socketConnection.emit("chat_message", response.text);
        
    })
    
            socketConnection.emit("chat_message", "hello there, How can I help you today?");
        
})


// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})