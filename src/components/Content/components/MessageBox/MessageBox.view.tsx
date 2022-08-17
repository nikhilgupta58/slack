import Avatar from "../../../Avatar";
import { useMessageBoxContext } from "./utils/context";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { IMessage } from "../../../../types";

export default function MessageBoxView() {
  const { messages, userData } = useMessageBoxContext();
  const messageIdSet = new Set();
  const currentUser = useSelector((state: RootState) => state.login.user);
  let time;
  const arr = React.useMemo(() => {
    return messages;
  }, [messages]);
  return (
    <>
      <div className="flex flex-col gap-[8px]" key={userData.id}>
        {arr?.map((row: IMessage, id) => {
          if (
            !(
              (row.receiverId == userData.id ||
                row.receiverId == currentUser.id) &&
              (row.userId == userData.id || row.userId == currentUser.id)
            ) ||
            (row.userId == row.receiverId && row.userId != userData?.id) ||
            messageIdSet.has(row.id)
          )
            return <React.Fragment key={row.id} />;
          messageIdSet.add(row.id);
          const user = row.userId == currentUser?.id ? currentUser : userData;
          const msgTime = new Date(row.createdAt).toLocaleDateString();
          const text =
            msgTime == new Date().toLocaleDateString() ? "Today" : msgTime;
          const showTag = msgTime == time ? false : true;
          time = msgTime;
          return (
            <>
              {showTag && <Tag text={text} />}
              <Message
                key={row.id}
                user={user}
                text={row.text}
                time={row.createdAt}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

const Tag = ({ text }: { text: string }) => {
  return (
    <>
      <div className="w-[100%] flex items-center py-[20px]">
        <div className="w-[100%] h-[1px] bg-gray-200" />
        <div className="border-[2px] text-[13px] px-[16px] py-[4px] rounded-[24px] opacity-[0.8]">
          {text}
        </div>
        <div className="w-[100%] h-[1px] bg-gray-200" />
      </div>
    </>
  );
};

const Message = ({ user, text, time }) => {
  return (
    <div className="flex gap-[8px] w-[100%] pr-[16px] pl-[16px]">
      <Avatar type="textarea" user={user} />
      <div className=" text-[0.938rem] w-[100%]">
        <div className="flex gap-2 items-center">
          <p className="font-[600]">{user?.username}</p>{" "}
          <p className="font-[200] text-[0.75rem]">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <p className="font-[400]" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
};
