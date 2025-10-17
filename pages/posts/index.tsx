import Head from "next/head";
import { getAllPosts } from "@/lib/posts-util";
import { AllPosts } from "@/components/posts/AllPosts";

const AllPostsPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>All My Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
export default AllPostsPage;
