import React from "react";
import getColor from "../colors";
import { IUser } from "../types";

export default function Avatar({
  user,
  type,
}: {
  user: IUser;
  type: "topbar" | "leftbar" | "textarea" | "profile";
}) {
  const initialLetter = user?.username.charAt(0).toUpperCase();
  const bgColor = getColor(initialLetter);
  const size =
    type == "topbar"
      ? {
          box: "24px",
          circle: "8px",
        }
      : type == "leftbar"
      ? {
          box: "20px",
          circle: "8px",
        }
      : type == "textarea"
      ? {
          box: "36px",
          circle: "0px",
        }
      : {
          box: "60px",
          circle: "0px",
        };
  const online = true ? "#007a5a" : "#fff";
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
        <p
          className="text-[#fff] font-bold"
          style={{
            fontSize: type == "profile" || type == "textarea" ? "20px" : "12px",
          }}
        >
          {initialLetter}
        </p>
        {type !== "textarea" && type != "profile" && (
          <div
            className={`absolute rounded-[10px] border-[1px] border-[#340F35] top-[70%] left-[70%]`}
            style={{
              backgroundColor: online,
              width: size.circle,
              height: size.circle,
            }}
          />
        )}
      </div>
    </>
  );
}
