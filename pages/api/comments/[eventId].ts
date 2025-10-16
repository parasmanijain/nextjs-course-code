import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";
import { Document, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Comment {
  email: string;
  name: string;
  text: string;
  eventId: string;
  _id?: ObjectId;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query;
  const eventId = data.eventId as string;
  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Connecting to the database failed!" });
  }

  const db = client.db("events");
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

    const newComment: Comment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({
      message: "Added comment.",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    let documents: Document[];
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }
  client.close();
};

export default handler;
