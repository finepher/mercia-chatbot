import { useState } from "react";
import ChatBox from "./ChatBox";
import Logo from "../../assets/images/logo.png";

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div>
      <button
        onClick={openChat}
        className="fixed right-4  bottom-5 bg-[#5A189A] text-[#f5f5f5] rounded-full p-2 item-center"
      >
        <img src={Logo} alt="logo" className="w-10" />
      </button>

      <ChatBox isOpen={isChatOpen} onClose={closeChat} />
    </div>
  );
};

export default Chat;
