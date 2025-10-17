import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if(!email || !name || !message || !email.includes('@') || name.trim()=== '' || message.trim()==='') {
       return res.status(422).json({message:"Invalid input."}) 
    }
    const newMessage = {
        email,name,message
    }
    return res.status(201).json({message:"Successfully stored the message"})
  }
};

export default handler;
