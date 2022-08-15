import React from "react";
import getColor from "../colors";
import { IUser } from "../types";

export default function Avatar({
  user,
  type,
}: {
  user: IUser;
  type: "topbar" | "leftbar";
}) {
  const initialLetter = user?.username.charAt(0).toUpperCase();
  const bgColor = getColor(initialLetter);
  const size =
    type == "topbar"
      ? {
          box: "24px",
          circle: "8px",
        }
      : {
          box: "20px",
          circle: "6px",
        };
  const online = true ? "#2ECC71" : "#fff";
  return (
    <>
      <div
        className={`rounded-[4px] flex justify-center items-center relative cursor-pointer hover:opacity-[0.9]`}
        style={{
          backgroundColor: bgColor,
          width: size.box,
          height: size.box,
        }}
      >
        <p className="text-[#fff] text-[12px]">{initialLetter}</p>
        <div
          className={`absolute rounded-[10px] border-[#340F35] border-[2px] top-[70%] left-[70%]`}
          style={{
            backgroundColor: online,
            width: size.circle,
            height: size.circle,
          }}
        />
      </div>
    </>
  );
}
