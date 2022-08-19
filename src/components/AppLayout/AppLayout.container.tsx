import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import useGetUser from "../../hooks/useGetUser";
import useMessage from "../../hooks/useMessage";
import useUsers from "../../hooks/useUsers";
import { RootState } from "../../store";
import { setLogin } from "../../store/loginSlice";
import { setMessage } from "../../store/messageSlice";
import { IUser } from "../../types";
import Peer from "simple-peer";
import { AppLayoutContext } from "./utils/context";
import AppLayoutView from "./AppLayout.view";
let socket;

export default function AppLayoutContainer({ children }) {
  const [connectedUser, setConnectedUser] = React.useState([]);
  const [value, setValue] = React.useState(false);
  const router = useRouter();
  const { userId } = router.query;

  const {
    data: users,
    isLoading: isUserLoading,
  }: { data: IUser[]; isLoading: boolean } = useUsers();
  const currnetUser = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();
  const [online, setOnline] = React.useState([]);
  const [type, setType] = React.useState([]);
  const {
    data: messageData,
    isLoading: isMessageDataLoading,
    refetch: messageRefetch,
  } = useMessage(currnetUser?.id);

  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);

  React.useEffect(() => {
    if (!isMessageDataLoading && messageData) {
      dispatch(setMessage({ message: messageData }));
    }
  }, [isMessageDataLoading, messageData]);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("slack-clone"));
    if (user) dispatch(setLogin(user));
    else router.push("/");
  }, []);

  const handleUserClick = (id) => {
    router.push("/client/" + id);
  };

  React.useEffect(() => {
    setInterval(() => {
      if (socket) {
        socket.emit("online", currnetUser?.id);
      }
    }, 5000);
    if (socket) {
      socket.on("user-type", (data) => {
        if (
          data?.author == currnetUser?.id ||
          data?.receiver == currnetUser?.id
        ) {
          setType((type) => [...type, data]);
        }
      });
    }
  }, [socket]);

  React.useEffect(() => {
    setInterval(() => {
      setOnline([]);
    }, 30000);
    setInterval(() => {
      setType([]);
    }, 2000);
  }, [socket]);

  const [usersInfo, setUsersInfo] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [socketInfo, setSocketInfo] = useState({});

  const userVideo = useRef();
  const partnerVideo = useRef();

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {});

    socket.on("user-online", (data) => {
      if (!online.includes(data)) setOnline((online) => [...online, data]);
    });

    socket.on("allUsers", (users) => {
      if (users?.socketid && users?.userid) {
        const temp = usersInfo;
        const id = users.userid;
        if (!temp[id]) {
          temp[id] = users?.socketid;
          setUsersInfo(temp);
          const tempSocket = socketInfo;
          tempSocket[users?.socketid] = id;
          setSocketInfo(tempSocket);
        }
      }
    });

    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  };

  function giveMicAccess() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //@ts-ignore
      setStream(stream);
      if (userVideo.current) {
        //@ts-ignore
        if (userVideo?.current) userVideo.current.srcObject = stream;
      }
    });
  }

  React.useEffect(() => {
    if (!socket) {
      socketInitializer();
    }
  }, []);

  function hangUp() {
    socket.emit("hangup", connectedUser);
    socket.removeListener("callAccepted");
    socket.emit("removeHuddle", connectedUser);
  }

  function callPeer(id) {
    setConnectedUser([socketInfo[id], currnetUser?.id]);
    giveMicAccess();
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: usersInfo[currnetUser?.id],
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        //@ts-ignore
        if (partnerVideo?.current) partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    socket.on("disconnectUser", (data) => {
      if (data.includes(currnetUser?.id)) {
        if (peer) {
          peer.removeAllListeners();
          peer.destroy();
        }
      }
    });
    socket.on("removeReceivingCall", (data) => {
      if (data.includes(currnetUser?.id)) {
        setReceivingCall(false);
        setCallAccepted(false);
        setValue(false);
      }
    });
  }

  function acceptCall() {
    setConnectedUser([socketInfo[caller], currnetUser?.id]);
    giveMicAccess();
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      //@ts-ignore
      if (partnerVideo?.current) partnerVideo.current.srcObject = stream;
    });
    socket.on("disconnectUser", (data) => {
      if (data.includes(currnetUser?.id)) {
        if (peer) {
          peer.removeAllListeners();
          peer.destroy();
        }
      }
    });
    peer.signal(callerSignal);
    socket.on("removeReceivingCall", (data) => {
      if (data.includes(currnetUser?.id)) {
        setReceivingCall(false);
        setCallAccepted(false);
        setValue(false);
      }
    });
  }

  return (
    <AppLayoutContext.Provider
      value={{
        setCallAccepted,
        children,
        router,
        users,
        isUserLoading,
        currnetUser,
        handleUserClick,
        online,
        messageRefetch,
        typing: type,
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
      }}
    >
      <AppLayoutView />
      <audio playsInline ref={partnerVideo} autoPlay />
      {/* <audio controls playsInline muted ref={userVideo} autoPlay /> */}
    </AppLayoutContext.Provider>
  );
}
