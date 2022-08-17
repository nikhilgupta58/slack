import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import { setSidebar } from "../../store/sidebarSlice";
import Navbar from "../Navbar";
import ContentView from "./Content.view";
import { ContentContext } from "./utils/context";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useMessage from "../../hooks/useMessage";
let socket;

export default function ContentContainer() {
  const router = useRouter();
  const [messages, setMessages] = React.useState([]);
  const { userId } = router.query;
  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);
  const currentUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    setMessages([]);
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
  return (
    <ContentContext.Provider
      value={{
        userData,
        isUserDataLoading,
        handleChange,
        input,
        setInput,
        messages,
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
