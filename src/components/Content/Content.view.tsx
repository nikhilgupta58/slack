import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ILogin } from "../../types";
import Avatar from "../Avatar";
import RichTextArea from "../RichTextArea";
import { MessageBox } from "./components/MessageBox";
import { useContentContext } from "./utils/context";

export default function ContentView() {
  const {
    userData,
    isUserDataLoading,
  }: { userData: ILogin; isUserDataLoading: boolean } = useContentContext();

  const { handleChange, input, setInput, messageData, messages, changeEvent } =
    useContentContext();
  const currentUser = useSelector((state: RootState) => state.login.user);

  React.useEffect(() => {
    const elem = document.getElementById("data");
    if (elem) elem.scrollTop = elem.scrollHeight;
  }, [messages]);

  if (isUserDataLoading || !messageData) {
    return (
      <div
        className="flex w-[100%] pt-[16px] pr-[16px] pb-[24px] pl-[16px] flex-col justify-end"
        style={{
          minHeight: "calc(100vh - 88px)",
        }}
      >
        <div className="flex flex-col gap-[12px]">
          <div className="flex gap-[16px] flex-col ">
            <div className="flex gap-[8px] items-center">
              <div>
                <div className="w-[60px] h-[60px] animate-pulse bg-gray-400 rounded-md" />
              </div>
              <div className="flex flex-col gap-[8px] ">
                <p className="animate-pulse bg-gray-300 w-[200px] h-[20px]" />
                <p className="animate-pulse bg-gray-300 w-[150px] h-[20px]" />
              </div>
            </div>
          </div>

          <div>
            <RichTextArea readOnly placeholder={"Loading..."} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex w-[100%] flex-col justify-end"
      style={{
        minHeight: "calc(100vh - 88px)",
      }}
    >
      <div className="flex flex-col gap-[12px]">
        <div
          id="data"
          className="flex gap-[16px] flex-col  overflow-y-scroll"
          style={{
            maxHeight: "calc(100vh - 320px)",
          }}
        >
          <div className="flex gap-[8px] items-center pt-[16px] pr-[16px]  pl-[16px]">
            <div>
              <Avatar user={userData} type="profile" />
            </div>
            <div className="text-[0.938rem] ">
              <p className="text-[#1d1c1d]">
                {userData?.username}{" "}
                <span className="ml-[5px]">
                  {currentUser?.id == userData?.id ? "(you)" : ""}
                </span>
              </p>
              <p className="text-[#1d1c1db3] opacity-[0.8]">
                {userData?.email}
              </p>
            </div>
          </div>

          <div className="text-[0.910rem] text-[#1d1c1db3] leading-[1.4] font-normal opacity-[0.9] pr-[16px] pl-[16px]">
            {currentUser?.id == userData?.id ? (
              <>
                <span className="font-[600]">This space is just for you.</span>{" "}
                Jot down notes, list your to-dos, or keep links and files handy.
                You can also talk to yourself here, but please bear in mind
                you’ll have to supply both sides of the conversation.
              </>
            ) : (
              <>
                This conversation is just between the two of you. Here you can
                send messages and share files with{" "}
                <span className="bg-blue-200 p-[2px]">
                  @{userData?.username}
                </span>
              </>
            )}
          </div>
          <div>
            <MessageBox />
          </div>
        </div>

        <div className=" pr-[16px] pb-[24px] pl-[16px]">
          <RichTextArea
            key={userData?.id}
            placeholder={
              currentUser?.id == userData?.id
                ? "Jot something down"
                : `Message ${userData?.username}`
            }
            onKeyUp={(e) => {
              if (e.code == "Enter") {
                handleChange();
              }
            }}
            value={input}
            onChange={(e) => {
              changeEvent(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
