import { Server } from "socket.io";
import { initializeConnection } from "../db";
import { createServer } from "http";
const uuid = require("uuid");
require("dotenv").config();
const SocketHandler = async (req, res) => {
  if (res.socket.server.io) {
  } else {
    const httpServer = createServer();
    const port = parseInt(process.env.PORT) | 4000;
    console.log("Socket is initializing");
    const io = new Server(httpServer, {});
    httpServer.listen(port)
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      socket.on("online", async (data) => {
        socket.broadcast.emit("user-online", data);
      });

      socket.on("input-type", async (data) => {
        socket.broadcast.emit("user-type", data);
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
