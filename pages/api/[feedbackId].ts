import { NextApiRequest, NextApiResponse } from "next";
import { buildFeedbackPath, extractFeedback } from "./feedback";

const handler = (req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST') {
        // 
    }
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const feedback = feedbackData.find(feedback=> feedback.id === feedbackId);
    return res.status(200).json({feedback})
};

export default handler;
