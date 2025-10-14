import React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import { PostHeader } from "./PostHeader";
import classes from "./PostContent.module.scss";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

// Define the type for post prop
interface Post {
  title: string;
  slug: string;
  image: string;
  content: string;
}

// Props for PostContent
interface PostContentProps {
  post: Post;
}

export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const components = {
    // Markdown image renderer
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      if (!src) return null;
      return (
        <Image
          src={`/images/posts/${post.slug}/${src}`}
          alt={alt || "Post image"}
          width={600}
          height={300}
        />
      );
    },

    // Markdown paragraph renderer
    p: ({ node, children }: any) => {
      const firstChild = node?.children?.[0];

      if (firstChild?.tagName === "img") {
        const image = firstChild.properties;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.src}`}
              alt={image.alt || "Post image"}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },

    // Markdown code block renderer
    code: ({
      className,
      children,
    }: {
      className?: string;
      children: string | string[];
    }) => {
      const language = className?.replace("language-", "") || "";
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {String(children).trim()}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
    </article>
  );
};
