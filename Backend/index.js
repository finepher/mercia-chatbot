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

    socketConnection.on("chat_message",async(data)=>{
        console.log(data, "<<message received")

        // ai api settings
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

            const response = await ai.models.generateContent({
              model: "gemini-1.5-flash",
              contents: data,
            });
        
            socketConnection.emit("chat_message", response.text);
            console.log(response.text, "<<message replayed")
        } catch (error) {
            socketConnection.emit("chat_message",`something went wrong on ${error.name} ${error.message}`);
            console.log(error)
        }
        
        
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