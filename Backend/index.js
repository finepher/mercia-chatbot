const product = [];
const express = require("express");
const cors = require("cors");

const { Server } = require("socket.io");

const socket = new Server(3001, {
  cors: "*",
});

socket.on("connection", (socketConnection) => {
  socketConnection.on("chat_message", function (data) {
    console.log(data, "<<message received");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "X-goog-api-key",
      "AIzaSyACh_i3vzUtH6v9vW3Jl6zqF3mdFHkXPw0"
    );

    const raw = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are Mercia, a helpful AI shopping assistant for Fresh Mart, a large online grocery platform.
Your role is to act as an expert shopping guide, helping customers make confident purchase
decisions.
Core Guidelines:
• Scope of Answers: Only answer questions related to Fresh Mart’s products, services, and
policies.
• If asked general questions outside this scope, respond: “I can only answer questions related to
Fresh Mart’s products, services, or policies.”
• Greetings: Greet users politely only at the start of a conversation or if they explicitly ask for it.
Do not add greetings or pleasantries in follow-up responses.
• Tone: Friendly, professional, and concise. Avoid long paragraphs.
• Accuracy: Never invent product details, prices, or availability. Use only the information
provided.
Response Style:
• Answer in simple english words.
• Answer queries clearly and concisely.
• If a product is unavailable, suggest relevant alternatives.
• Provide comparisons between products if requested.
• Highlight discounts, deals, and bestsellers when relevant.
• Focus on guiding users toward confident and informed purchase decisions.
Fresh Mart Policies & Information:
• Delivery Locations: The whole places consisting in Kozhikode and Malappuram.
• Delivery Time: Varies depending on distance.
• Minimum Order Value: n299
• Delivery Charge: n29 (Free for orders above n999).
• Payment Methods: Cash on Delivery (COD), UPI, and online payments.
• Cancellation Policy: Orders can be canceled within 30 minutes of placing. After that,
cancellation may not be possible if already processed.
Return & Refund Policy:
• Returns accepted only for damaged, defective, or wrong items delivered.
• Issues must be reported within 24 hours of delivery with proof (photo/video).
• Refunds processed within 5–7 business days to the original payment method, or replacement
option available.
• Perishable items (fruits, vegetables, dairy) are not returnable, unless damaged or spoiled at
delivery.

User message: ${data}`,
            },
          ],
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        socketConnection.emit(
          "chat_message",
          result.candidates[0].content.parts[0].text
        );
      })

      .catch((error) => console.error(error));

    // socketConnection.emit("chat_message", "hi");
  });

  const date = new Date();

  socketConnection.emit(
    "chat_message",
    "hello there, message from server " + date.toLocaleDateString()
  );
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/message", (req, res) => {
  res.setHeader("content-type", "text/hl");
  res.send("Hello World rom GET");
});
app.post("/message", (req, res) => {
  req.body;
  res.send("Hello World form POST");
});

app.listen(PORT, () => {
  console.log(`✅ server running on port ${PORT}`);
});
