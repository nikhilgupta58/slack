import { motion } from "framer-motion";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Avatar from "../../Avatar";
import { useAppLayoutContext } from "../utils/context";
import { BsBroadcastPin } from "react-icons/bs";

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
  } = useAppLayoutContext();
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
                              userId == user.id ? "#1264A3" : "inherit",
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
          {!isUserDataLoading && currnetUser?.id != userId && (
            <div className="px-4 py-6 border-t-[1px] border-[#743f75] flex justify-between opacity-[0.8] text-[0.9rem] leading-[1.4]">
              <div className="flex items-center gap-2">
                <div className="text-[1.5rem]">
                  <BsBroadcastPin />
                </div>
                {userData?.username}
              </div>
              <div>
                <label className="switch">
                  <input type="checkbox" className="scale-90" />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
}
