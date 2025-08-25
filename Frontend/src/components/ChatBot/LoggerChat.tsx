import Triangle from "../../assets/images/Rectangle 2.png";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";

const LoggerChat = ({ Chat }: { Chat: string | number }) => {
  return (
    <div className="z-0">
      <div className="relative flex justify-start  w-9/10 rounded-lg rounded-br-none pl-4 p-3 pb-7 bg-[#dee2e6]  mb-17 ml-7">
        <p className="ml-2 text-[#444444]">{Chat}</p>
        <img
          src={Triangle}
          alt=""
          className="w-10 absolute  right-0  -bottom-5"
        />
        <div className=" absolute  -right-3  -bottom-13 bg-[#c9b8da] p-1 rounded-full">
          <CgProfile size={35} />
        </div>
        <p className="absolute  left-5  -bottom-5 text-[#444444] text-xs">
          7:20
        </p>
        <LiaCheckDoubleSolid className="absolute  left-12  -bottom-5 text-[#444444]" />
      </div>
    </div>
  );
};

export default LoggerChat;
