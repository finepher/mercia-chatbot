import Triangle from "../../assets/images/Rectangle 2.png";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import userprofile from "../../assets/images/userprofile.jpg";

const UserChat = ({
  key,
  Chat,
  time,
}: {
  key: number;
  Chat: string;
  time: string;
}) => {
  return (
    <div key={key}>
      <div className="relative flex justify-start  max-w-60 rounded-lg rounded-br-none pl-4 p-3 pb-7 bg-[#dee2e6]  mb-17 ml-7">
        <p className="ml-2 text-[#444444] break-words w-full">{Chat}</p>
        <img
          src={Triangle}
          alt=""
          className="w-10 absolute  right-0  -bottom-5"
        />
        <div className=" absolute  -right-3  -bottom-13 bg-[#c9b8da]  rounded-full">
          <img src={userprofile} alt="" className="w-11 rounded-full" />
        </div>
        <p className="absolute  left-5  -bottom-5 text-[#444444] text-xs">
          {time}
        </p>
        <LiaCheckDoubleSolid className="absolute  left-13  -bottom-5 text-[#444444]" />
      </div>
    </div>
  );
};

export default UserChat;
