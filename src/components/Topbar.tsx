import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Avatar from "./Avatar";

export default function Topbar() {
  const user = useSelector((state: RootState) => state.login.user);
  const router = useRouter();
  return (
    <div className="flex w-[100vw] h-[40px] px-[8px] py-[16px] gap-[16px] bg-[#340F35] items-center shadow-[inset 0px -1px 0px rgba(255, 255, 255, 0.2)] justify-between">
      <div
        onClick={() => {
          localStorage.setItem("slack-clone", "null");
          router.push("/api/auth/logout");
        }}
        className="cursor-pointer hover:opacity-[0.9]"
      >
        <img src="/logoff.png" width="30px" />
      </div>
      <div>
        <Avatar user={user} type={"topbar"} />
      </div>
    </div>
  );
}
