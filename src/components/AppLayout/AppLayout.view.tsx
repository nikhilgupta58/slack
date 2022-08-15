import React from "react";
import LeftSidebar from "./components/LeftSidebar";
import Topbar from "./components/Topbar";
import { useAppLayoutContext } from "./utils/context";

export default function AppLayoutView() {
  const { children } = useAppLayoutContext();
  return (
    <div className="min-h-[100vh] w-[100vw] flex">
      <Topbar />
      <LeftSidebar />
      <div className="pt-[40px]">{children}</div>
    </div>
  );
}
