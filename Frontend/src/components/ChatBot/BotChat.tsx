import { useState } from "react";
import Triangle from "../../assets/images/Rectangle 1.png";
import Logo from "../../assets/images/logo.png";
import { LuClipboardList } from "react-icons/lu";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";

const BotChat = ({
  key,
  Chat,
  time,
}: {
  key: number;
  Chat: string;
  time: string;
}) => {
  const [copyBtn, setCopyBtn] = useState<boolean>(false);
  return (
    <div
      key={key}
      className="relative flex justify-start  max-w-60  rounded-lg rounded-bl-none text-[#ffffff] pl-4 p-3 pb-7 bg-[#3c096c]  mb-17 -ml-3 z-0"
    >
      <p className="ml-2 text-[#ffffff] break-words w-full">
        {Chat === "Thinking..." ? `🤔${Chat}` : Chat}
      </p>
      <img src={Triangle} alt="" className="w-10 absolute  left-0  -bottom-5" />
      <div className=" absolute  -left-3  -bottom-12 bg-[#5A189A] p-2 rounded-full">
        <img src={Logo} alt="" className="w-7" />
      </div>
      <p className="absolute  left-9  -bottom-6 text-[#444444] text-xs ">
        {time}
      </p>
      <div className="flex justify-between items-center gap-2 absolute  right-5  -bottom-2  bg-[#5A189A] p-1 rounded-md">
        <button
          className={copyBtn ? "text-[#43ee7d]" : ""}
          onClick={async () => {
            setCopyBtn(true);
            try {
              await navigator.clipboard.writeText(Chat);
            } catch (error) {
              console.error("Failed to copy: ", error);
            } finally {
              setTimeout(() => setCopyBtn(false), 500);
            }
          }}
        >
          <LuClipboardList
            size={15}
            className={copyBtn ? "text-[#43ee7d]" : ""}
          />
        </button>
        <button>
          <FaThumbsUp size={15} />
        </button>
        <button>
          <FaThumbsDown size={15} />
        </button>
      </div>
    </div>
  );
};

export default BotChat;
