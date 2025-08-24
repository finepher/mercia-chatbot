// import React from 'react'
import BotChat from "./BotChat";
import LoggerChat from "./LoggerChat";
import { MdOutlineDoNotDisturbOn } from "react-icons/md";
import Logo from "../../assets/images/logo.png";
import Send from "../../assets/images/send.png";

const ChatBox = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-4  bottom-5 ">
      <div className="relative shadow-b-lg w-82 rounded-lg bg-[#f8f9fa]">
        {/* Header */}
        <div className="flex justify-between item-center h-18 px-6 py-4  bg-[#9CADFF] rounded-t-lg shadow-[0_5px_6px_rgba(0,0,0,0.3)] z-4">
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
        <div className="h-110 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-7 py-5 ">
          <BotChat />
          <LoggerChat />
          <BotChat />
          <LoggerChat />
          <BotChat />
          <LoggerChat />
          <BotChat />
          <LoggerChat />
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-center items-center gap-1.5 bg-[#ffffff] h-27 px-6 py-4 rounded-b-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-4">
          <div className="flex justify-between items-center w-full overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg">
              <p>🤔 Do you deliver?</p>
            </div>
            <div className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg">
              <p>💰 Stores</p>
            </div>
            <div className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg">
              <p>🙋‍♂️ FAQs</p>
            </div>
          </div>
          <div className=" flex justify-evenly items-center w-full p-3 rounded-lg bg-[#E8EBF0]">
            <input
              className="w-60 outline-none"
              type="text"
              placeholder="Type your message here..."
            />
            <button>
              <img className="w-5" src={Send} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
