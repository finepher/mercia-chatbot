const chat = require('../entities/Chat.schema');
const mongoose = require('mongoose');

const getChats = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const startOfDay = new Date();
              startOfDay.setHours(0, 0, 0, 0); // today 00:00:00
        
              const endOfDay = new Date();
              endOfDay.setHours(23, 59, 59, 999); // today 23:59:59
        
              const previousChats = await chat.find({
                user_id: new mongoose.Types.ObjectId(id),
                createdAt: {
                  $gte: startOfDay,
                  $lte: endOfDay,
                },
              })
                .sort({ createdAt: 1 })
              // console.log("previousChats", previousChats);
              let chatHistory = previousChats?.map((chat) => {
                return {role: chat.role, content: chat.message, time: chat.createdAt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })};
              });
            //   console.log("chatHistory", chatHistory);
            return res.status(200).json(chatHistory);
    } catch (error) {
        console.log("error in fetching chats", error);
        res.status(500).json({message: "Internal server error"});
    }
};

module.exports = {getChats};