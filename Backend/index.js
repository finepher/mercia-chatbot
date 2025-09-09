const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const OpenAI = require("openai");
const openai = new OpenAI({
                 apiKey: process.env.GEMINI_API_KEY,
                 baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
            });

const {Server} = require('socket.io');

const socket = new Server(3001,{
    cors: "*"
})

socket.on("connection",(socketConnection)=>{

    const welcomeMessage = {content: "👋 Hi, I’m Mercia, your shopping assistant! How can I help you today?", role: 'assistant'}
    socketConnection.emit("chat_message", welcomeMessage);

    socketConnection.on("chat_message",async(data)=>{
        console.log("message received>>" ,data)

        // ai api settings
        try {
            

            const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", 
                  content: `You are a helpful AI shopping assistant for a large grocery online platform 
                            called Fresh Mart. you should answer as an expert shopping assistant.
                            your name is Mercia.

                            user id is ${data.Id}. you should remember this user id for future conversations.
                            do not include the user id in your responses.

                            Your goals:
                            - Understand user queries about grocery products and provide accurate, relevant information.
                            - Greet users politely **only when they start a conversation or if explicitly asked**.
                            - Do not include greetings, introductions, or pleasantries in follow-up responses.
                            - Maintain a friendly and professional tone, but focus on answering the questions clearly and concisely.  
                            - Help customers browse products across multiple categories 
                              (vegetable,fruits,meet,fish,dairy etc).  
                            - Answer questions clearly and concisely, avoiding long paragraphs.  
                            - Suggest alternatives if a product is not available.  
                            - Provide comparisons between products if asked.  
                            - Highlight discounts, deals, and bestsellers when relevant.  
                            - Guide users toward making confident purchase decisions.  
                            - Never make up fake prices or availability—only respond with the info you are given.
                            - Delivery Locations: Kozhikode and Malappuram districts only
                            - Delivery Time: Delivery time may vary depending on the distance.
                            - Minimum Order: ₹299
                            - Delivery Charge: ₹29 (Free for orders above ₹999)
                            - Payment Methods: We accept all major payment methods in India, including Cash on Delivery (COD), UPI, and online payments.
                            - Cancellation Policy: Orders can be canceled within 30 minutes of placing the order.
                                                   After this time, cancellations may not be possible if the order is already being processed.
                            - Return & Refund Policy: Returns are accepted only for damaged, defective, or wrong items delivered.
                                                      Customers must report the issue within 24 hours of delivery with proof (photo/video).
                            - Refunds will be processed within 5–7 business days to the original payment method, or customers may choose replacement.
                            - Perishable items (like fruits, vegetables, and dairy) are not eligible for return unless damaged or spoiled at the time of delivery.                          
` },
                {
                    role: "user",
                    content: data.message,
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
        
})


// express server settings

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})