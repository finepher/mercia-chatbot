const Users = require("../entities/User.schema");
const Chat = require("../entities/Chat.schema");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const ws = (socketConnection) => {

  socketConnection.emit("chat_message", {content: "👋 Hi, I’m Mercia, your shopping assistant! ", role: "assistant",});
  
  socketConnection.on("user_login", async (data) => {
    
    if(data === "new_user"){
      console.log("user logged in>>", data);
      socketConnection.emit("chat_message", "May i know your name?");
    }else{
      console.log("user logged in>>", data);
      const createdUser = await Users.create({ name: data });
      socketConnection.emit("user_login", { id: createdUser._id, message: "How can i help you today" });
    }
  });

  socketConnection.on("chat_message", async (data) => {
    console.log("message received>>", data);
    // database settings
    
    // console.log("userId", userId);
    

    await Chat.create({
      user_id: new mongoose.Types.ObjectId(data.Id),
      message: data.message,
      role: "user",
    });

    // ai api settings
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // today 00:00:00

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // today 23:59:59

      const previousChats = await Chat.find({
        user_id: new mongoose.Types.ObjectId(data.Id),
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      })
        .sort({ createdAt: 1 })
        .limit(10);
      // console.log("previousChats", previousChats);
      let chatHistory = previousChats.map((chat) => {
        return `${chat.role}:${chat.message}`;
      });
        // console.log("chatHistory", chatHistory);
        console.log("chatHistory", previousChats);
      const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI shopping assistant for a large grocery online platform 
                            called Fresh Mart. you should answer as an expert shopping assistant.
                            your name is Mercia.

                            user id is ${data.Id}. you should remember this user id for future conversations.
                            do not include the user id in your responses.

                            this is previous chat history of this user:
                            ${chatHistory.join("\n")}


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
`,
          },
          {
            role: "user",
            content: data.message,
          },
        ],
      });
      await Chat.create({
        user_id: new mongoose.Types.ObjectId(data.Id),
        message: response.choices[0].message.content,
        role: "assistant",
      });
      socketConnection.emit("chat_message", response.choices[0].message);
      console.log("message replayed>>", response.choices[0].message);
    } catch (error) {
      socketConnection.emit("chat_message", `something went wrong on`);
      console.log(error);
    }
  });
}

module.exports = ws;