import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({
        message: "Invalid input.",
      });
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    return res.status(201).json({
      message: "Added comment.",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    const dummyList = [];
    return res.status(200).json({
      comments: dummyList,
    });
  }
};

export default handler;
