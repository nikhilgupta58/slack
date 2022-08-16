import React from "react";
import Avatar from "./Avatar";

export default function Navbar({
  data,
  isLoading,
  type,
}: {
  data: any;
  isLoading: boolean;
  type: "user" | "channel";
}) {
  if (isLoading) {
    return (
      <div
        className="flex h-[48px] py-[9px] px-[16px] border-b-[1px] min-w-[100%] animate-pulse bg-gray-200"
        style={{
          boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
        }}
      />
    );
  }

  if (type == "user") {
    return (
      <div
        className="flex h-[48px] py-[9px] px-[16px] border-b-[1px] min-w-[100%]"
        style={{
          boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex gap-[12px] px-[12px] py-[4px] cursor-pointer hover:bg-[#340F35] items-center">
          <div>
            <Avatar user={data} type="topbar" />
          </div>
          <p className="truncate">{data.username}</p>
        </div>
      </div>
    );
  }

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
