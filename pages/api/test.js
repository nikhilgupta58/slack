import excuteQuery from "./db";

export default async function handler(req, res) {
  try {
    const result = await excuteQuery({
      query: "use slack",
      values: [req.body.content],
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ name: "Connection Success" });
}
