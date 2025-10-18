import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import { MongoClient } from "mongodb";
import { hashPassword } from "@/lib/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  if(!email || !email.includes('@') || !password || password.trim().length<7) {
    return res.status(422).json({message: 'Invalid input - password should be atleast 7 characters long.'})
  }
  let client:MongoClient;
  try {
    client = await connectToDatabase();
  } catch(error) {
    return res.status(500).json({message:""});
  }

  const db = client.db();
  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email,
    password:hashedPassword
  });
  res.status(201).json({message:'Created user!'});

};

export default handler;
