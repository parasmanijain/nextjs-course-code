import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Define structure for the incoming message
interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

// Extend to include MongoDB-generated ID
interface StoredMessage extends ContactFormData {
  id?: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed.' });
    return;
  }

  const { email, name, message } = req.body as ContactFormData;

  // Basic validation
  if (
    !email ||
    !email.includes('@') ||
    !name ||
    name.trim() === '' ||
    !message ||
    message.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const newMessage: StoredMessage = {
    email,
    name,
    message,
  };

  let client: MongoClient;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ntrwp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database.' });
    return;
  }

  const db = client.db();

  try {
    const result = await db.collection('messages').insertOne(newMessage);
    newMessage.id = result.insertedId.toString();
  } catch (error) {
    await client.close();
    res.status(500).json({ message: 'Storing message failed!' });
    return;
  }

  await client.close();

  res.status(201).json({
    message: 'Successfully stored message!',
    messageData: newMessage,
  });
}

export default handler;
