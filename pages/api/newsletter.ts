import { connectDatabase, insertDocument } from "@/helpers/db-util";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    let client: MongoClient;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Connecting to the database failed!" });
    }

    try {
      await insertDocument(client, "newsletter", {
        email,
      });
      res.status(201).json({
        message: "Signed up!",
      });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
    client.close();
  }
};

export default handler;
