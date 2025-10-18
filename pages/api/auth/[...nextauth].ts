import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email,
        });
        if (!user) {
          client.close();

          throw new Error("Incorrect Credentials");
        }
        const isValid = await verifyPassword(password, user);
        if (!isValid) {
          client.close();

          throw new Error("Incorrect Credentials");
        }
        client.close();
        return {
          email: user.email || null,
          id: user._id.toString(),
        };
      },
    }),
  ],
});
