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
      <div className="shadow-lg w-90 rounded-lg ">
        {/* Header */}
        <div className="flex justify-between item-center px-6 py-4  bg-[#9CADFF] rounded-t-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex gap-2 items-center justify-between">
            <img src={Logo} alt="" className="w-12" />
            <div className="flex flex-col text-[#43ee7d]">
              <h2 className="text-[#ffffff] text-xl font-bold">Mercia</h2>
              <p>Online</p>
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
        <div className="h-96 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-7 py-5 bg-[#f8f9fa]">
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
        <div className="flex flex-col justify-center items-center gap-1.5 bg-[#ffffff] px-6 py-4 rounded-b-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center w-full ">
            <div className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg">
              <p>🤔 Do you deliver Tirur?</p>
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
