import React from "react";
import Avatar from "../Avatar";
import { useContentContext } from "./utils/context";

export default function ContentView() {
  const { count } = useContentContext();
  return (
    <div
      className="flex w-[100%] pt-[16px] pr-[16px] pb-[24px] pl-[16px] flex-col justify-between"
      style={{
        minHeight: "calc(100vh - 88px)",
      }}
    >
      <div>
        <Avatar
          user={{ username: "Nikgil", id: "", email: "" }}
          type="profile"
        />
      </div>
      <div>
        <input className="border-[1px] rounded-md w-[100%] h-[80px]" />
      </div>
    </div>
  );
}
