import Triangle from "../../assets/images/Rectangle 1.png";
import Logo from "../../assets/images/logo.png";
import { LuClipboardList } from "react-icons/lu";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
const BotChat = () => {
  return (
    <div className="relative flex justify-start  w-9/10 rounded-lg rounded-bl-none text-[#ffffff] pl-4 p-3 pb-7 bg-[#3c096c]  mb-10 -ml-3 z-0">
      <p className="ml-2 text-[#ffffff]">Hello from bot</p>
      <img src={Triangle} alt="" className="w-10 absolute  left-0  -bottom-5" />
      <div className=" absolute  -left-3  -bottom-12 bg-[#5A189A] p-2 rounded-full">
        <img src={Logo} alt="" className="w-7" />
      </div>
      <p className="absolute  left-9  -bottom-6 text-[#444444] text-xs">7:20</p>
      <div className="flex justify-between items-center gap-2 absolute  right-5  -bottom-2  bg-[#5A189A] p-1 rounded-md">
        <button>
          <LuClipboardList size={15} />
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
