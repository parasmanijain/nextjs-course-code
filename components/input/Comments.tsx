import { useEffect, useState } from "react";
import { CommentList } from "./CommentList";
import { NewComment } from "./NewComment";
import classes from "./Comments.module.scss";

export const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const response = await fetch(`/api/comments/${eventId}`);
    const { comments } = await response.json();
    setComments(comments);
  };

  useEffect(() => {
    if (showComments) {
      getComments();
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
    if (showComments) {
    }
  };

  const addCommentHandler = async (commentData) => {
    const response = await fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
};
