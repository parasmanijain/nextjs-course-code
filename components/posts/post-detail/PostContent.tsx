import ReactMarkdown from "react-markdown";
import classes from "./PostContent.module.scss";
import { PostHeader } from "./PostHeader";
import Image from "next/image";

export const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customComponents = {
    img: ({ src, alt }) => (
      <Image
        src={`/images/posts/${post.slug}/${src}`}
        alt={alt}
        width={600}
        height={300}
      />
    ),
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customComponents}>{post.content}</ReactMarkdown>
    </article>
  );
};
