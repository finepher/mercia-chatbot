import Triangle from "../../assets/images/Rectangle 2.png";
import { CgProfile } from "react-icons/cg";

const LoggerChat = () => {
  return (
    <div className="relative flex justify-start  w-9/10 rounded-lg rounded-br-none p-2 pb-5 bg-[#dee2e6]  mb-10 ml-7">
      <p className="ml-2 text-[#444444]">
        Hello from logger Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Eius ad dolorum nihil corrupti perferendis ullam in, quas
        voluptatibus illo possimus maiores natus dignissimos unde doloremque
        rem, cum eos pariatur commodi!
      </p>
      <img
        src={Triangle}
        alt=""
        className="w-10 absolute  right-0  -bottom-5"
      />
      <div className=" absolute  -right-3  -bottom-13 bg-[#c9b8da] p-1 rounded-full">
        <CgProfile size={35} />
      </div>
      <p className="absolute  left-5  -bottom-5 text-[#444444] text-xs">7:20</p>
    </div>
  );
};

export default LoggerChat;
