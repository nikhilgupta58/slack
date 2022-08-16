import { initializeConnection } from "../db";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const uuid = require("uuid");

export default async function handler(req, res) {
  try {
    const db = await initializeConnection();
    if (req.method != "GET") {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const jwtToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!jwtToken) {
      res.status(401).send({ message: "No Bearer token passed" });
    } else {
      const email = jwt.decode(jwtToken).email;
      await db.query(
        `select * from slack.user where email = '${email ? email : " "}'`,
        async (err, response) => {
          if (err) throw err;
          if (response.length == 0) {
            res.status(401).send("Unauthorized user");
          } else {
            await db.query("select * from slack.user", (err, response) => {
              if (err) throw err;
              res.status(200).send(response);
            });
          }
        }
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message }).end();
  }
  return;
}
