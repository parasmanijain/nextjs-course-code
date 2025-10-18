import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  const { email } = session.user;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email });

  if (!user) {
    client.close();
    return res.status(404).json({ message: "Incorrect credentials" });
  }

  const { password } = user;
  const passwordsAreEqual = await verifyPassword(oldPassword, password);
  if (!passwordsAreEqual) {
    client.close();
    return res.status(403).json({ message: "Incorrect credentials" });
  }

  const hashedPassword = await hashPassword(newPassword);
  const updateResult = await usersCollection.updateOne(
    {
      email,
    },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  return res.status(200).json({
    message: "Password changed successfully!",
  });
};

export default handler;
