import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface Message {
  email: string;
  name: string;
  message: string;
  id?: ObjectId;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !name ||
      !message ||
      !email.includes("@") ||
      name.trim() === "" ||
      message.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input." });
    }
    const newMessage: Message = {
      email,
      name,
      message,
    };
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.h1buo.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.mongodb_appname}`;
    let client: MongoClient;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      return res.status(500).json({ message: "Could not connect to database" });
    }

    try {
      const db = client.db("blog");
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      res
        .status(201)
        .json({ message: "Successfully stored message!" + newMessage });
    } catch (error) {
      res.status(500).json({ message: "Storing message failed" });
    }

    client.close();
    return;
  }
};

export default handler;
