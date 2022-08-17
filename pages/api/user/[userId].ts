import { initializeConnection } from "../db";
import { user_exists } from "../login";

const jwt = require("jsonwebtoken");
require("dotenv").config();
const uuid = require("uuid");

export async function get_user_by_id(db, id) {
  return new Promise(function (resolve, reject) {
    db.query(
      `select * from slack.user where id = '${id ? id : ""}'`,
      function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve(rows[0]);
      }
    );
  });
}

export default async function handler(req, res) {
  try {
    const db = await initializeConnection();
    const { userId } = req.query;
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
      const user = await user_exists(db, email).then((data) => data);
      if (!user) return res.status(401).send("Unauthorized user");
      else {
        const result = await get_user_by_id(db, userId).then((data) => data);
        return res.status(200).send(result);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message }).end();
  }
  return;
}
