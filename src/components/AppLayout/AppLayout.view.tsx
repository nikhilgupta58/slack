import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSidebar } from "../../store/sidebarSlice";
import LeftSidebar from "./components/LeftSidebar";
import Topbar from "./components/Topbar";
import { useAppLayoutContext } from "./utils/context";

export default function AppLayoutView() {
  const { children } = useAppLayoutContext();
  const dispatch = useDispatch();

  return (
    <div
      className="min-h-[100vh] w-[100vw] flex overflow-x-hidden"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <Topbar />
      <LeftSidebar />
      <div
        className="pt-[40px] w-[100%]"
      >
        {children}
      </div>
    </div>
  );
}
