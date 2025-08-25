// import React from "react";

const SuggestedMessages = ({
  index,
  msg,
  InputMessage,
}: {
  index: number;
  msg: string;
  InputMessage: (message: string) => void;
}) => {
  return (
    <div
      key={index}
      onClick={() => InputMessage(msg)}
      className="bg-[#f3f5f6] px-2 font-semibold py-1 text-xs text-[#444444] shadow-xs rounded-lg"
    >
      <p>{msg}</p>
    </div>
  );
};

export default SuggestedMessages;
