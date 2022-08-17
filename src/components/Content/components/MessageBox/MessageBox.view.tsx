import Avatar from "../../../Avatar";
import { useMessageBoxContext } from "./utils/context";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

interface IProp {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  receiverId: string;
}

export default function MessageBoxView() {
  const { messages, userData } = useMessageBoxContext();
  const messageIdSet = new Set();
  const currentUser = useSelector((state: RootState) => state.login.user);

  const arr = React.useMemo(() => {
    return messages;
  }, [messages]);

  return (
    <>
      <Tag text={"Today"} />
      <div className="flex pr-[16px] pl-[16px] flex-col gap-[8px] ">
        {arr?.map((row: IProp, id) => {
          if (
            (!(
              row.receiverId == userData.id || row.receiverId == currentUser.id
            ) &&
              (row.userId == userData.id || row.userId == currentUser.id)) ||
            messageIdSet.has(row.id)
          )
            return <React.Fragment key={id}></React.Fragment>;
          messageIdSet.add(row.id);
          const user = row.userId == currentUser?.id ? currentUser : userData;
          return <Message key={id} user={user} text={row.text} />;
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

const Message = ({ user, text }) => {
  return (
    <div className="flex gap-[8px] w-[100%]">
      <Avatar type="textarea" user={user} />
      <div className=" text-[0.938rem] w-[100%]">
        <p className="font-[600]">{user?.username}</p>
        <p className="font-[400]" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
};
