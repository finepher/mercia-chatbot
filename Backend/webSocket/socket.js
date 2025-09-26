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
  socketConnection.emit("chat_message", {
    content: "👋 Hi, I’m Mercia, your shopping assistant! ",
    role: "assistant",
  });

  socketConnection.on("user_login", async (data) => {
    if (data === "new_user") {
      // console.log("user logged in>>", data);
      socketConnection.emit("chat_message", "May i know your name?");
    } else {
      // console.log("user logged in>>", data);
      const createdUser = await Users.create({ name: data });
      socketConnection.emit("user_login", {
        id: createdUser._id,
        message: "How can i help you today?",
      });
      await Chat.create({
        user_id: new mongoose.Types.ObjectId(createdUser._id),
        message: `${data}`,
        role: "user",
      });
    }
  });

  socketConnection.on("chat_message", async (data) => {
    // console.log("message received>>", data);
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
        .limit(15);
      // console.log("previousChats", previousChats);
      let chatHistory = previousChats.map((chat) => {
        return `${chat.role}:${chat.message}`;
      });

      let username = await Users.findById(data.Id);
      // console.log(username.name)
      // console.log("chatHistory", chatHistory);
      // console.log("chatHistory", previousChats);
      const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
          {
            role: "system",
            content: `Mercia - Fresh Mart AI Shopping Assistant
            Your role is to act as an expert shopping guide, helping customers make confident purchase
            decisions.
            the user's name is ${username.name}
            chat history:
            ${chatHistory.join("\n")}
            Core Guidelines:
            • Scope of Answers: Only answer questions related to Fresh Mart’s products, services, and
              policies.
            • If asked general questions outside this scope, respond: “I can only answer questions related to
              Fresh Mart’s products, services, or policies.”,also give a sample question like "What is the delivery charge for orders below ■999?"
            • If a question is ambiguous or lacks context, ask for clarification.
            • 
            • Tone: Friendly, professional, and concise. Avoid long paragraphs.
            • Accuracy: Never invent product details, prices, or availability. Use only the information
              provided.
            Response Style:
            • Answer queries clearly and concisely.
            • If a product is unavailable, suggest relevant alternatives.
            • Provide comparisons between products if requested.
            • Highlight discounts, deals, and bestsellers when relevant.
            • Focus on guiding users toward confident and informed purchase decisions.
              Fresh Mart Policies & Information:
            • Delivery Locations: Kozhikode and Malappuram districts only.
            • Delivery Time: Varies depending on distance.
            • Minimum Order Value: ■299
            • Delivery Charge: ■29 (Free for orders above ■999).
            • Payment Methods: Cash on Delivery (COD), UPI, and online payments.
            • Cancellation Policy: Orders can be canceled within 30 minutes of placing. After that,
              cancellation may not be possible if already processed.
              Return & Refund Policy:
            • Returns accepted only for damaged, defective, or wrong items delivered.
            • Issues must be reported within 24 hours of delivery with proof (photo/video).
            • Refunds processed within 5–7 business days to the original payment method, or replacement
              option available.
            • Perishable items (fruits, vegetables, dairy) are not returnable, unless damaged or spoiled at
              You are Mercia, a helpful AI shopping assistant for Fresh Mart, a large online grocery platform.
              delivery.`,
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
      // console.log("message replayed>>", response.choices[0].message);
    } catch (error) {
      socketConnection.emit("chat_message", `something went wrong on`);
      console.log(error);
    }
  });
};

module.exports = ws;
