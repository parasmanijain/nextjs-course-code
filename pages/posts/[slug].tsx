import Head from "next/head";
import { getPostData, getPostsFiles } from "@/lib/posts-util";
import { PostContent } from "@/components/posts/post-detail/PostContent";

const PostDetailPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export function getStaticProps({ params }) {
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const paths = postFileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, "") },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default PostDetailPage;
