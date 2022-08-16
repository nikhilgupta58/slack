import React from "react";
import io from "Socket.IO-client";
import MessageBoxView from "./MessageBox.view";
import { MessageBoxContext } from "./utils/context";
let socket;

export default function MessageBoxContainer() {
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };
  React.useEffect(() => {
    socketInitializer();
  }, []);

  const [input, setInput] = React.useState("");

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };
  return (
    <MessageBoxContext.Provider value={{}}>
      <MessageBoxView />
    </MessageBoxContext.Provider>
  );
}
