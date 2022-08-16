import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import useUsers from "../../hooks/useUsers";
import { RootState } from "../../store";
import { IUser } from "../../types";
import AppLayoutView from "./AppLayout.view";
import { AppLayoutContext } from "./utils/context";
import io from "socket.io-client";
let socket;

export default function AppLayoutContainer({ children }) {
  const router = useRouter();
  const {
    data: users,
    isLoading: isUserLoading,
  }: { data: IUser[]; isLoading: boolean } = useUsers();
  const currnetUser = useSelector((state: RootState) => state.login.user);
  const [online, setOnline] = React.useState([]);
  React.useEffect(() => {
    if (!currnetUser) {
      router.push("/");
    }
  }, []);

  const handleUserClick = (id) => {
    router.push("/client/" + id);
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {});

    socket.on("user-online", (data) => {
      if (!online.includes(data)) setOnline((online) => [...online, data]);
    });
  };

  React.useEffect(() => {
    socketInitializer();
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      if (socket) socket.emit("online", currnetUser?.id);
      setOnline([]);
    }, 60000);
  }, [socket]);

  return (
    <AppLayoutContext.Provider
      value={{
        children,
        router,
        users,
        isUserLoading,
        currnetUser,
        handleUserClick,
        online,
      }}
    >
      <AppLayoutView />
    </AppLayoutContext.Provider>
  );
}
