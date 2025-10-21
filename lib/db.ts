import { MongoClient } from "mongodb";

export const connectToDatabase = () =>
  MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.h1buo.mongodb.net/${process.env.mongodb_dbname}?retryWrites=true&w=majority&appName=${process.env.mongodb_appname}`
  );
