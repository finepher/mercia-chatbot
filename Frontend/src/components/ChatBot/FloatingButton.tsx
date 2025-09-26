import { useState } from "react";
import ChatBox from "./ChatBox";
import Logo from "../../assets/images/logo.png";
import { AnimatePresence } from "framer-motion";
const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const closeChat = () => setIsChatOpen(false);

  return (
    <div>
      {!isChatOpen && (
        <div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed right-4  bottom-5 bg-[#5A189A] text-[#f5f5f5] rounded-full p-2 item-center"
          >
            <img src={Logo} alt="logo" className="w-10" />
          </button>
        </div>
      )}
      <AnimatePresence>
        {isChatOpen && <ChatBox onClose={closeChat} />}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
