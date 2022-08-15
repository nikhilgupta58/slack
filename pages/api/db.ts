require("dotenv").config();
const mysql = require("mysql");
export const db = mysql.createConnection(process.env.DATABASE_URL);

export async function initializeConnection() {
  async function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        //@ts-ignore
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");
          initializeConnection();
          //@ts-ignore
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  var connection = mysql.createConnection(process.env.DATABASE_URL);

  // Add handlers.
  await addDisconnectHandler(connection);

  await connection.connect();
  return connection;
}
