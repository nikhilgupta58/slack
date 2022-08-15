import React from "react";

export default function LeftSidebar() {
  return (
    <div>
      <div className="w-[300px] h-[calc(100vh)] bg-[#3E113F] sticky top-0 text-[#fff] pt-[40px] overflow-y-scroll">
        <div className="border-y-[1px] border-[#743f75] py-[8px] px-[16px]">
          <p className="text-[#fff] text-[1.125rem] leading-[1.369rem] font-bold tracking-[0.04em]">
            Organization
          </p>
        </div>
      </div>
    </div>
  );
}
