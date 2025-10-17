import ReactMarkdown from "react-markdown";
import classes from "./PostContent.module.scss";
import { PostHeader } from "./PostHeader";

export const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
};
