import React from "react";
import Avatar from "./Avatar";
import { CgToolbarLeft } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setSidebar } from "../store/sidebarSlice";

export default function Navbar({
  data,
  isLoading,
  type,
}: {
  data: any;
  isLoading: boolean;
  type: "user" | "channel";
}) {
  const sidebarActive = useSelector((state: RootState) => state.sidebar.active);
  const dispatch = useDispatch();
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
        className=" px-[0px] flex h-[48px] py-[9px] md:px-[16px] border-b-[1px] min-w-[100%]"
        style={{
          boxShadow: "inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex gap-[12px] px-[12px] py-[4px] cursor-default items-center">
          <div
            className="text-[25px] hover:bg-gray-200 p-[2px] rounded-md cursor-pointer md:hidden"
            onClick={() => {
              if (sidebarActive) dispatch(setSidebar({ active: false }));
              else dispatch(setSidebar({ active: true }));
            }}
          >
            <CgToolbarLeft />
          </div>
          <div>
            <Avatar user={data} type="topbar" />
          </div>
          <p className="truncate">{data?.username}</p>
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
