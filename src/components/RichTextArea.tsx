import React, { useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function RichTextArea({ ...props }) {
  const [showFormatting, setShowFormatting] = React.useState(true);

  React.useEffect(() => {
    const tx = document?.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
  }, []);

  function OnInput() {
    this.style.height = "auto";
    if (this.scrollHeight > 300) this.style.height = "300px";
    else this.style.height = this.scrollHeight + "px";
  }
  return (
    <div className="border-[2px] rounded-md w-[100%] text-[0.938rem] leading-[1.46]">
      {showFormatting && <div className="p-[4px] h-[40px] bg-gray-100"></div>}
      <textarea
        className="rounded-md min-h-[0px] resize-none py-[8px] px-[12px] w-[100%] active:outline-none hover:outline-none focus:outline-none overflow-y-scroll"
        {...props}
      />
      <div className="px-[4px] h-[40px] m-[4px] flex gap-[4px] items-center justify-between">
        <div className="flex items-center gap-4 text-[18px]">
          <p
            className="underline opacity-[0.8] font-[100] leading-4 cursor-default hover:bg-gray-100 p-[4px] rounded-sm border-r-[1px] pr-4 border-gray-400"
            onClick={() =>
              setShowFormatting((showFormatting) => !showFormatting)
            }
          >
            Aa
          </p>
          <div className="cursor-pointer hover:bg-gray-100 p-[4px] rounded-sm ">
            <BsEmojiSmile />
          </div>
        </div>
        <div className="text-[20px]" style={{ color: "#99A3A4 " }}>
          <IoMdSend />
        </div>
      </div>
    </div>
  );
}
