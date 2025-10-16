import { MongoClient, SortDirection } from "mongodb";

export const connectDatabase = () => {
  return MongoClient.connect(
    `mongodb+srv://parasmanijain2208:Gulshan1006@cluster0.h1buo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  );
};

export const insertDocument = (
  client: MongoClient,
  collection: string,
  document
) => {
  const db = client.db("events");
  return db.collection(collection).insertOne(document);
};

export const getAllDocuments = (
  client: MongoClient,
  collection: string,
  sort: { [key: string]: SortDirection },
  filter = {}
) => {
  const db = client.db("events");
  return db.collection(collection).find(filter).sort(sort).toArray();
};
