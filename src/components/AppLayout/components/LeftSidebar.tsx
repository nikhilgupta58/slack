import { motion } from "framer-motion";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Avatar from "../../Avatar";
import { useAppLayoutContext } from "../utils/context";
import { BsBroadcastPin } from "react-icons/bs";
import React from "react";

export default function LeftSidebar() {
  const sidebarActive = useSelector((state: RootState) => state.sidebar.active);
  const openBar = {};
  const closeBar = {};
  const {
    children,
    router,
    users,
    isUserLoading,
    currnetUser,
    handleUserClick,
    online,
    typing,
    userId,
    userData,
    isUserDataLoading,
    usersInfo,
    socketInfo,
    callPeer,
    acceptCall,
    receivingCall,
    caller,
    setReceivingCall,
    hangUp,
    callAccepted,
    value,
    setValue,
  } = useAppLayoutContext();
  let userUsername = {};

  if (currnetUser)
    return (
      <motion.div className={`${sidebarActive ? "flex" : "hidden"} md:flex`}>
        <div className="flex flex-col justify-between  w-[200px] h-[calc(100vh)] bg-[#3E113F] sticky top-0 text-[#fff] pt-[40px] lg:w-[300px] md:w-[250px] sm:w-[200px]">
          <div>
            <div className="border-y-[1px] border-[#743f75] py-[8px] px-[16px] hover:bg-[#340F35] h-[48px] flex items-center">
              <p className="text-[#fff] text-[1.125rem] leading-[1.369rem] font-bold tracking-[0.04em]">
                Organization
              </p>
            </div>

            <div
              className="overflow-y-scroll"
              style={{ height: "calc(100vh - 200px)" }}
            >
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
                  {Array.from({ length: 0 }, (x, id) => {
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
                      <div
                        key={id}
                        className="animate-pulse h-[30px] bg-[#572558] mt-[10px] mr-[20px] rounded-md"
                      />
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
                      <div>
                        <Avatar user={currnetUser} type="leftbar" />
                      </div>
                      <p className="truncate">{currnetUser.username}</p>
                      <p className="text-[0.875rem] opacity-[0.5]">you</p>
                    </div>
                    {users?.map((user, id) => {
                      userUsername[user.id] = user.username;
                      if (user.id == currnetUser.id) return;
                      let isTyping = false;
                      typing.map((type, id) => {
                        if (
                          (type?.author == user?.id ||
                            type?.receiver == user?.id) &&
                          userId != user.id
                        )
                          isTyping = true;
                      });
                      return (
                        <div
                          key={id}
                          className="flex gap-[12px] px-[12px] py-[4px] cursor-pointer hover:bg-[#340F35] items-center"
                          onClick={() => handleUserClick(user.id)}
                          style={{
                            backgroundColor:
                              userId == user.id ? "#1164A3" : "inherit",
                          }}
                        >
                          <div>
                            {isTyping ? (
                              <div className="font-bold">...</div>
                            ) : (
                              <Avatar
                                user={user}
                                type="leftbar"
                                isOnline={online.includes(user.id)}
                              />
                            )}
                          </div>
                          <p className="truncate">{user.username}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isUserDataLoading && (
            <div className=" px-4 py-6 border-t-[1px] border-[#743f75] flex justify-between opacity-[0.8] text-[0.9rem] leading-[1.4]">
              {receivingCall && (
                <div className="absolute w-[100%] left-0 z-10 bottom-[80px] flex justify-center">
                  <div className="w-[90%] bg-[#1164A3] rounded-lg flex flex-col p-[15px] gap-4">
                    <div className="flex justify-between w-[100%] gap-4 text-[0.8rem]">
                      <div className="font-[200]">
                        <p>
                          <span className="font-bold">
                            {" "}
                            {userUsername[socketInfo[caller]]
                              ? userUsername[socketInfo[caller]]
                              : "Someone"}
                          </span>{" "}
                          is inviting you to a huddle
                        </p>
                      </div>
                      <div className="text-[1.2rem] text-white">
                        <BsBroadcastPin />
                      </div>
                    </div>

                    <div className="flex justify-end text-[0.8rem]">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            hangUp();
                          }}
                          className="font-bold px-6 py-[4px] bg-[#3d7caf] text-[#fff] rounded-[5px]"
                        >
                          Not Now
                        </button>
                        <button
                          onClick={() => {
                            acceptCall(socketInfo[caller]);
                            setReceivingCall(null);
                          }}
                          className="font-bold px-6 py-[4px] bg-[#fff] text-[#1164A3] rounded-[5px]"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currnetUser?.id != userId && (
                <>
                  <div
                    className="flex items-center gap-2"
                    style={{
                      color: callAccepted ? "#4792cb" : "white",
                      fontWeight: callAccepted ? "900" : "400",
                    }}
                  >
                    <div className="text-[1.5rem]">
                      <BsBroadcastPin />
                    </div>
                    {!callAccepted ? userData?.username : "Connected"}
                  </div>
                  <div>
                    <label className="switch rounded-[99px]">
                      <input
                        type="checkbox"
                        checked={value || callAccepted}
                        onChange={(e) => {
                          if (e.target.checked && usersInfo[userData.id]) {
                            callPeer(usersInfo[userData.id]);
                          } else if (!e.target.checked) hangUp();
                          setValue(e.target.checked);
                        }}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
}
