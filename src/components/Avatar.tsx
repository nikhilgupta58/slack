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
        className={`w-[${size.box}] h-[${size.box}] rounded-[4px] bg-[${bgColor}] flex justify-center items-center relative cursor-pointer`}
      >
        <p className="text-[#fff] text-[12px]">{initialLetter}</p>
        <div
          className={`absolute rounded-[10px] w-[${size.circle}] h-[${size.circle}] border-[#340F35] border-[2px] top-[70%] left-[70%]`}
          style={{
            backgroundColor: online,
          }}
        />
      </div>
    </>
  );
}
