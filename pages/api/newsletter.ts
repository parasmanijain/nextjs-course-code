import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    const client = await MongoClient.connect(
      `mongodb+srv://parasmanijain2208:Gulshan1006@cluster0.h1buo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    const db = client.db('newsletter');
    await db.collection('emails').insertOne({
      email
    });
    client.close();
    return res.status(201).json({
      message: "Signed up!",
    });
  }
};

export default handler;
