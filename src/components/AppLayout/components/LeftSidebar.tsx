import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

export default function LeftSidebar() {
  return (
    <div>
      <div className="w-[300px] h-[calc(100vh)] bg-[#3E113F] sticky top-0 text-[#fff] pt-[40px] overflow-y-scroll">
        <div className="border-y-[1px] border-[#743f75] py-[8px] px-[16px] hover:bg-[#340F35]">
          <p className="text-[#fff] text-[1.125rem] leading-[1.369rem] font-bold tracking-[0.04em]">
            Organization
          </p>
        </div>

        <div className="pt-[24px] pl-[16px]">
          <div className="flex gap-[12px] cursor-pointer items-center ">
            <div className="flex text-[0.938rem] text-[#fff] justify-center items-center">
              <BsFillCaretDownFill />
            </div>
            <p className="text-[#fff] text-[0.938rem] leading-[1.369rem] font-[300] tracking-[0.04em]">
              Channel
            </p>
          </div>

          <div className="font-[100]">
            {Array.from({ length: 4 }, (x, id) => {
              return (
                <div className="flex gap-[12px] px-[16px] py-[4px]">
                  <p>#</p>
                  <p>block-kit-blunder</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-[24px] pl-[16px]">
          <div className="flex gap-[12px] cursor-pointer items-center">
            <div className="flex text-[0.938rem] text-[#fff] justify-center items-center">
              <BsFillCaretDownFill />
            </div>
            <p className="text-[#fff] text-[0.938rem] leading-[1.369rem] font-[300] tracking-[0.04em]">
              Direct messages
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
