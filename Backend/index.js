const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const OpenAI = require("openai");

const {Server} = require('socket.io');

const socket = new Server(3001,{
    cors: "*"
})

socket.on("connection",(socketConnection)=>{

    socketConnection.on("chat_message",async(data)=>{
        console.log("message received>>" ,data)

        // ai api settings
        try {
            const openai = new OpenAI({
                 apiKey: process.env.GEMINI_API_KEY,
                 baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
            });

            const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", 
                  content: `You are a helpful AI shopping assistant for a large e-commerce platform 
                            (similar to Amazon or Flipkart).
                            your name is Mercia.

                            Your goals:
                            - Greet users politely and maintain a friendly, professional tone.  
                            - Help customers browse products across multiple categories 
                              (electronics, fashion, home, books, etc).  
                            - Answer questions clearly and concisely, avoiding long paragraphs.  
                            - Suggest alternatives if a product is not available.  
                            - Provide comparisons between products if asked.  
                            - Highlight discounts, deals, and bestsellers when relevant.  
                            - Guide users toward making confident purchase decisions.  
                            - Never make up fake prices or availability—only respond with the info you are given.` },
                {
                    role: "user",
                    content: data,
                },
            ],
            });
        
            socketConnection.emit("chat_message", response.choices[0].message);
            console.log("message replayed>>" ,response.choices[0].message)
        } catch (error) {
            socketConnection.emit("chat_message",`something went wrong on`);
            console.log(error)
        }
        
        
    })

            const welcomeMessage = {content: "👋 Hi, I’m Mercia, your shopping assistant! How can I help you today?", role: 'assistant'}
            socketConnection.emit("chat_message", welcomeMessage);
        
})


// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})