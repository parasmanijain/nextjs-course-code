import { useState } from "react";
import { buildFeedbackPath, extractFeedback, Feedback } from "../api/feedback";

const FeedbackPage = ({ feedbackItems }) => {
  const [feedbackData, setFeedbackData] = useState<Feedback>();
  const loadFeedbackHandler = async (id) => {
    const response = await fetch(`/api/${id}`);
    const { feedback } = await response.json();
    setFeedbackData(feedback);
  };
  return (
    <>
    {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const feedbackItems = extractFeedback(filePath);
  return {
    props: {
      feedbackItems,
    },
  };
}

export default FeedbackPage;
