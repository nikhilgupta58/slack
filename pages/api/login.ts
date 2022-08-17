import { initializeConnection } from "./db";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uuid = require("uuid");

const generateJWT = (user: { email: string; username: string }) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

async function user_exists(db, email) {
  return new Promise(function (resolve, reject) {
    db.query(
      `select * from slack.user where email = '${email}'`,
      function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        if (rows.length == 1) resolve(true);
        resolve(false);
      }
    );
  });
}

async function create_user(db, { username, email, access_token }) {
  return new Promise(function (resolve, reject) {
    db.query(
      `insert into slack.user values('${uuid.v1()}','${username}','${email}','${access_token}',current_time(),current_time())`,
      function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve("Created Success");
      }
    );
  });
}

async function update_user(db, { email, access_token }) {
  return new Promise(function (resolve, reject) {
    db.query(
      `UPDATE slack.user SET access_token='${access_token}', updatedAt=current_time() WHERE email = '${email}';`,
      function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve("Updated Success");
      }
    );
  });
}

async function get_user(db, { email }) {
  return new Promise(function (resolve, reject) {
    db.query(
      `select * from slack.user WHERE email = '${email}';`,
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
    const user_already_exists = await user_exists(db, email).then(
      (data) => data
    );
    if (user_already_exists) {
      await create_user(db, {
        username: username,
        email: email,
        access_token: access_token,
      });
    } else {
      await update_user(db, {
        email: email,
        access_token: access_token,
      });
    }
    const response = await get_user(db, { email: email }).then((data) => data);
    return res.status(200).send(JSON.stringify(response));
  } else {
    res.status(400).send({ message: "Fields missing" });
  }
  res.status(500).send({ message: "Server Error" });
}
