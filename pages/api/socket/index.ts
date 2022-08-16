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
      socket.on("input-change", async (data) => {
        const message = {
          id: uuid.v4(),
          text: data.msg,
          createdAt: new Date(),
        };
        const response = { message: message, user: data.user };
        socket.broadcast.emit("update-input", response);
        try {
          const db = await initializeConnection();
          await db.query(
            `insert into slack.message values('${message.id}','${data.user.userId}','${message.text}',current_time())`,
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
