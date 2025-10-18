import { MongoClient } from "mongodb";

export const connectToDatabase = () => {
  return MongoClient.connect(
    "mongodb+srv://paras:MhdnFBPtCvMv0blg@cluster0.h1buo.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster0"
  );
};
