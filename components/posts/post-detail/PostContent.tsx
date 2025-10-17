import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import  atomDark  from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
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
        priority
      />
    ),
   code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
};
