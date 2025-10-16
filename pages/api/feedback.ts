import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Feedback {
  id: string;
  email: string;
  text: string;
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, text } = req.body as { email: string; text: string };

    if (!email || !text) {
      return res.status(400).json({ message: "Email and text are required." });
    }

    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");

    let data: Feedback[] = [];

    try {
      const fileData = fs.readFileSync(filePath, "utf-8");
      data = JSON.parse(fileData) as Feedback[];
    } catch (error) {
      // If file doesn't exist or can't be read, start with empty array
      data = [];
    }

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(201).json({
      message: "Success!",
      feedback: newFeedback,
    });
  }

  return res.status(200).json({
    message: "This works!",
  });
};

export default handler;
