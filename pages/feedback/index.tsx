import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const FeedbackPage = ({ feedbackItems }) => {
  return (
    <ul>
      {feedbackItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
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
