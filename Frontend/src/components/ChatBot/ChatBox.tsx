import { useState } from "react";
import BotChat from "./BotChat";
import LoggerChat from "./LoggerChat";
import SuggestedMessages from "./SuggestedMessages";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import Logo from "../../assets/images/logo.png";
import Send from "../../assets/images/send.png";

type ChatMessage = {
  role: string;
  content: string | number;
};

const ChatBox = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [inputMessage, setInputMessage] = useState<string | number>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const suggestedMessages: string[] = [
    "🤔 Do you deliver tirur?",
    "💰 Stores",
    "🙋‍♂️ FAQs",
    "📞 Contact Us",
  ];

  const SuggestedMessagesHandler = (msg: string) => setInputMessage(msg);

  if (!isOpen) return null;

  return (
    <div className="fixed right-4  bottom-5 ">
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
        <div className="relative h-110 top-18 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-7 py-5 z-1">
          <BotChat key={0} Chat={"Hello from bot"} />
          {messages.map((message, index) =>
            message.role === "user" ? (
              <LoggerChat key={index} Chat={message.content} />
            ) : (
              <BotChat key={index} Chat={message.content} />
            )
          )}
        </div>

        {/* Footer */}
        <div className="absolute flex flex-col justify-center items-center gap-1 bg-[#ffffff] h-27 bottom-0 w-full px-6 py-4 rounded-b-lg shadow-[0_-4px_6px_3px_rgba(0,0,0,0.1)] z-4">
          <div className="w-full px-1  overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max  gap-2">
              {suggestedMessages.map((msg, index) => (
                <SuggestedMessages
                  key={index}
                  index={index}
                  msg={msg}
                  InputMessage={SuggestedMessagesHandler}
                />
              ))}
            </div>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputMessage.toString().trim()) return; // prevent empty message
                setMessages([
                  ...messages,
                  { role: "user", content: inputMessage },
                ]);
                setInputMessage("");
              }}
              className="flex justify-evenly items-center w-full p-3 rounded-lg bg-[#E8EBF0]"
            >
              <input
                className="w-60 outline-none"
                type="text"
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
    </div>
  );
};

export default ChatBox;
