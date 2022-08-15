import { initializeConnection } from "./db";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uuid = require("uuid");

const generateJWT = (user: { email: string; username: string }) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

export default async function handler(req, res) {
  try {
    const db = await initializeConnection();
    if (req.method != "POST") {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { email, username } = req.body;
    if (email && username) {
      const access_token = generateJWT({
        email: email,
        username: username,
      });
      await db.query(
        `select * from slack.user where email = '${email}'`,
        async (err, response) => {
          if (err) throw err;
          if (response.length == 0) {
            await db.query(
              `insert into slack.user values('${uuid.v1()}','${username}','${email}','${access_token}',current_time(),current_time())`,
              (err, response) => {
                if (err) throw err;
              }
            );
          } else {
            await db.query(
              `UPDATE slack.user SET access_token='${access_token}', updatedAt=current_time() WHERE email = '${email}';`,
              (err, response) => {
                if (err) throw err;
              }
            );
          }
          res.status(200).send({
            accesstoken: access_token,
            email: email,
            username: username,
          });
        }
      );
    } else {
      res.status(400).send({ message: "Fields missing" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message }).end();
  }
  return;
}
