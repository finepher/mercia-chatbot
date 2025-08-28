const product = []
const express = require('express');
const cors = require('cors');

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
        const ai = new GoogleGenAI({ apiKey: "AIzaSyBjASFxZEV_nPTZKRw079XkOH7xCo3aFww" });

        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: data,
      });
        
            socketConnection.emit("chat_message", response.text);
        
    })
    
            const date = new Date()
            socketConnection.emit("chat_message", "hello there, message from server " + (date.toLocaleDateString()));
        
})


// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    // res.setHeader("content-type", "text/hl");
    res.send('Hello World rom GET');
})
app.post('/message', (req, res) => {
    req.body
    res.send('Hello World form POST');
})

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})