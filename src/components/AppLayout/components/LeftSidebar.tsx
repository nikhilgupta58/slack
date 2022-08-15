import { useRouter } from "next/router";
import React from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import useUsers from "../../../hooks/useUsers";
import { RootState } from "../../../store";
import { IUser } from "../../../types";
import Avatar from "../../Avatar";
import { useAppLayoutContext } from "../utils/context";

export default function LeftSidebar() {
  const {
    children,
    router,
    users,
    isUserLoading,
    currnetUser,
    handleUserClick,
  } = useAppLayoutContext();
  const { userId } = router.query;
  if (currnetUser)
    return (
      <div>
        <div className="w-[300px] h-[calc(100vh)] bg-[#3E113F] sticky top-0 text-[#fff] pt-[40px] overflow-y-scroll">
          <div className="border-y-[1px] border-[#743f75] py-[8px] px-[16px] hover:bg-[#340F35] h-[48px] flex items-center">
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
                  <div
                    key={id}
                    className="flex gap-[12px] px-[16px] py-[4px] hover:bg-[#340F35]"
                  >
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
            {isUserLoading && (
              <>
                {Array.from({ length: 2 }, (x, id) => (
                  <div className="animate-pulse h-[30px] bg-[#572558] mt-[10px] mr-[20px] rounded-md" />
                ))}
              </>
            )}
            {users && (
              <div className="flex flex-col gap-[8px] font-[100] pt-[10px]">
                <div
                  className="flex gap-[12px] px-[12px] py-[4px] cursor-pointer hover:bg-[#340F35] items-center"
                  onClick={() => handleUserClick(currnetUser.id)}
                  style={{
                    backgroundColor:
                      userId == currnetUser.id ? "#1264A3" : "inherit",
                  }}
                >
                  <Avatar user={currnetUser} type="leftbar" />
                  <p>{currnetUser.username}</p>
                  <p className="text-[0.875rem] opacity-[0.5]">you</p>
                </div>
                {users?.map((user, id) => {
                  if (user.id == currnetUser.id) return;
                  return (
                    <div
                      key={id}
                      className="flex gap-[12px] px-[12px] py-[4px] cursor-pointer hover:bg-[#340F35] items-center"
                      onClick={() => handleUserClick(user.id)}
                      style={{
                        backgroundColor:
                          userId == user.id ? "#1264A3" : "inherit",
                      }}
                    >
                      <Avatar user={user} type="leftbar" />
                      <p>{user.username}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
