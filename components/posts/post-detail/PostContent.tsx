import ReactMarkdown from "react-markdown";
import classes from "./PostContent.module.scss";
import { PostHeader } from "./PostHeader";

const DUMMY_POSTS = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started With Nextjs",
  image: "getting-started-nextjs.png",
  date: "2025-10-17",
  content: "# This is a first post",
};
export const PostContent = () => {
  const imagePath = `/images/posts/${DUMMY_POSTS.slug}/${DUMMY_POSTS.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POSTS.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POSTS.content}</ReactMarkdown>
    </article>
  );
};
