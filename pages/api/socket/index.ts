import { Server } from "socket.io";
import { initializeConnection } from "../db";
const uuid = require("uuid");

const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("online", async (data) => {
        socket.broadcast.emit("user-online", data);
      });

      socket.on("input-change", async (data) => {
        const message = {
          id: uuid.v4(),
          text: data.msg,
          createdAt: new Date(),
        };
        const response = {
          id: message.id,
          userId: data.user.id,
          text: data.msg,
          createdAt: message.createdAt,
          receiverId: data.receiver.id,
        };
        socket.broadcast.emit("update-input", response);
        try {
          const db = await initializeConnection();
          await db.query(
            `insert into slack.message values('${message.id}','${response.userId}','${message.text}',current_time(),'${response.receiverId}')`,
            async (err, response) => {
              if (err) throw err;
            }
          );
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: err.message }).end();
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;

// "id": "fb42e58c-2a62-4765-ba47-57af2ade392f",
// "userId": "b8f20aa0-1cb2-11ed-b376-f717c75a9a10",
// "text": "vdv",
// "createdAt": "2022-08-16T23:24:53.000Z",
// "receiverId": "b8f20aa0-1cb2-11ed-b376-f717c75a9a10"
