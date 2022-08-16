import React from "react";
import { useMessageBoxContext } from "./utils/context";

export default function MessageBoxView() {
  return (
    <>
      <div className="w-[100%] flex items-center py-[20px]">
        <div className="w-[100%] h-[1px] bg-gray-200" />
        <div className="border-[2px] text-[13px] px-[16px] py-[4px] rounded-[24px] opacity-[0.8]">Yesturday</div>
        <div className="w-[100%] h-[1px] bg-gray-200" />
      </div>
    </>
  );
}
