import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Comment {
  email: string;
  name: string;
  text: string;
  eventId: string;
  id?: ObjectId;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.query;
  const eventId = data.eventId as string;
  const client = await MongoClient.connect(
    `mongodb+srv://parasmanijain2208:Gulshan1006@cluster0.h1buo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
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
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    return res.status(201).json({
      message: "Added comment.",
      comment: newComment,
    });
  }
  if (req.method === "GET") {
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    return res.status(200).json({
      comments: documents,
    });
  }
  client.close();
};

export default handler;
