import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Avatar from "../../../Avatar";
import { useMessageBoxContext } from "./utils/context";

interface IProp {
  message: {
    id: string;
    text: string;
    createdAt: string;
  };
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export default function MessageBoxView() {
  const currentUser = useSelector((state: RootState) => state.login.user);
  const { messages } = useMessageBoxContext();
  return (
    <>
      <Tag text={"Yestursday"} />
      <div className="flex pr-[16px] pl-[16px] flex-col gap-[8px] ">
        {messages?.map((row: IProp, id) => {
          return <Message key={id} user={row.user} text={row.message} />;
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
        <p
          className="font-[400]"
          dangerouslySetInnerHTML={{ __html: text?.text }}
        />
      </div>
    </div>
  );
};
