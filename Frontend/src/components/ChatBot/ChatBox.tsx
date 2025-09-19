import { useEffect, useRef, useState } from "react";
import BotChat from "./BotChat";
import UserChat from "./UserChat";
import SuggestedMessages from "./SuggestedMessages";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import Logo from "../../assets/images/logo.png";
import Send from "../../assets/images/send.png";
import { Socket, io } from "socket.io-client";
import { motion } from "framer-motion";

type ChatMessage = {
  role: string;
  content: string;
  time: string;
};

const ChatBox = ({ onClose }: { onClose: () => void }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const userId = () => {
    // localStorage.setItem("userId", "68c2ebd4cda9bc8dd3642989");
    const storedId = localStorage.getItem("userId");
    return storedId;
  };

  const getTime = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return currentTime;
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId()) return;
    const apiURL = `http://localhost:3000/chat/${userId()}`;
    const getChats = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);

  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    if (!userId()) {
      socketRef.current?.emit("user_login", "new_user");
    }

    socketRef.current?.on("chat_message", (data) => {
      setMessages((prev) => [
        ...prev.filter((msg) => msg.content !== "Thinking..."),
        {
          role: data?.role || "assistant",
          content: data?.content?.trim() || data,
          time: getTime(),
        },
      ]);
    });
    socketRef.current?.on("user_login", (data) => {
      console.log(data);
      localStorage.setItem("userId", data?.id);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.message,
          time: getTime(),
        },
      ]);
    });

    return () => {
      socketRef.current?.off("chat_message");
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed right-4  bottom-5 "
        initial={{ scale: 0.3, opacity: 0, originX: 1, originY: 1 }}
        animate={{ scale: 1, opacity: 1, originX: 1, originY: 1 }}
        exit={{ scale: 0.3, opacity: 0, originX: 1, originY: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative shadow-lg w-82 h-155 rounded-lg bg-[#f8f9fa]">
          {/* Header */}
          <div className="absolute flex justify-between item-center h-18 w-full  px-6 py-4  bg-[#9CADFF] rounded-t-lg shadow-[0_5px_6px_rgba(0,0,0,0.3)] z-4">
            <div className="flex gap-2 items-center justify-between">
              <img src={Logo} alt="" className="w-12" />
              <div className="flex flex-col text-[#43ee7d]">
                <h2 className="text-[#ffffff] text-xl font-bold">Mercia</h2>
                <p>
                  <span className="inline-block w-3 h-3 rounded-full bg-[#43ee7d] me-1"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              className="text-[#ffffff] text-2xl hover:text-gray-300"
              onClick={onClose}
            >
              <MdOutlineDoNotDisturbOn />
            </button>
          </div>
          {/* Chat Messages */}
          <div className="relative h-110 top-18 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pl-9 py-5 z-1">
            {messages.map((message, i) =>
              message.role === "user" ? (
                <UserChat
                  index={i}
                  Chat={message.content}
                  time={message.time}
                />
              ) : (
                <BotChat index={i} Chat={message.content} time={message.time} />
              )
            )}
            <div ref={scrollRef} />
          </div>

          {/* Footer */}
          <div className="absolute flex flex-col justify-center items-center gap-1 bg-[#ffffff] h-27 bottom-0 w-full px-6 py-4 rounded-b-lg shadow-[0_-4px_6px_3px_rgba(0,0,0,0.1)] z-4">
            <div className="w-full px-1  overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <SuggestedMessages
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
              />
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!inputMessage.toString().trim()) return; // prevent empty message
                  if (!userId()) {
                    socketRef.current?.emit("user_login", inputMessage);
                    setInputMessage("");
                    setMessages((prev) => {
                      return [
                        ...prev,
                        {
                          role: "user",
                          content: inputMessage,
                          time: getTime(),
                        },
                      ];
                    });
                    return;
                  }
                  setMessages((prev) => {
                    return [
                      ...prev,
                      { role: "user", content: inputMessage, time: getTime() },
                    ];
                  });
                  socketRef.current?.emit("chat_message", {
                    message: inputMessage,
                    Id: userId(),
                  });
                  setInputMessage("");
                  setTimeout(() => {
                    setMessages((prev) => {
                      return [
                        ...prev,
                        {
                          role: "assistant",
                          content: "Thinking...",
                          time: getTime(),
                        },
                      ];
                    });
                  }, 500);
                }}
                className="flex justify-evenly items-center w-full p-3 rounded-lg bg-[#E8EBF0]"
              >
                <input
                  className="w-60 outline-none"
                  type="text"
                  maxLength={200}
                  value={inputMessage}
                  placeholder="Type your message here..."
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                />
                <button type="submit">
                  <img className="w-5" src={Send} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatBox;
