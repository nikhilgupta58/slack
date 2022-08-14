require("dotenv").config();
const mysql = require("mysql2/promise");
const db = mysql.createConnection(process.env.DATABASE_URL);

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
