import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import useGetUser from "../../hooks/useGetUser";
import { RootState } from "../../store";
import { setSidebar } from "../../store/sidebarSlice";
import { useAppLayoutContext } from "../AppLayout/utils/context";
import Navbar from "../Navbar";
import ContentView from "./Content.view";
import { ContentContext } from "./utils/context";

let socket;

export default function ContentContainer() {
  const { messageRefetch } = useAppLayoutContext();
  const router = useRouter();
  const [messages, setMessages] = React.useState([]);
  const { userId } = router.query;
  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);
  const currentUser = useSelector((state: RootState) => state.login.user);
  const messageData = useSelector((state: RootState) => state.message.message);
  const queryClient = useQueryClient();

  React.useEffect(() => {
    if (messageData) {
      setMessages([]);
      setMessages(messageData);
    }
  }, [messageData, userId]);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (messageRefetch) messageRefetch();
    setInput("");
  }, [userId]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  };
  React.useEffect(() => {
    socketInitializer();
  }, []);

  const [input, setInput] = React.useState("");

  const handleChange = (e) => {
    const message = input.split("\n")[0];
    setInput("");
    if (message) {
      const data = {
        msg: message,
        user: currentUser,
        receiver: userData,
      };
      socket.emit("input-change", data);
    }
  };

  const changeEvent = (e) => {
    setInput(e);
    socket.emit("input-type", {
      author: currentUser?.id,
      receiver: userData?.id,
    });
  };

  return (
    <ContentContext.Provider
      value={{
        userData,
        isUserDataLoading,
        handleChange,
        input,
        setInput,
        messages,
        messageData,
        changeEvent,
      }}
    >
      <Navbar data={userData} type={"user"} isLoading={isUserDataLoading} />
      <div
        onClick={() => {
          dispatch(setSidebar({ active: false }));
        }}
      >
        <ContentView />
      </div>
    </ContentContext.Provider>
  );
}
