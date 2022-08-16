import React from "react";

export default function Navbar() {
  return (
    <div
      className="flex h-[48px] py-[9px] px-[16px] border-b-[1px] min-w-[100%]"
      style={{
        boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex gap-[12px] px-[16px] py-[4px] cursor-default">
        <p>#</p>
        <p>block-kit-blunder</p>
      </div>
    </div>
  );
}
