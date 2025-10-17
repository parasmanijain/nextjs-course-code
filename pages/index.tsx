import Head from "next/head";
import { getFeaturedPosts } from "@/lib/posts-util";
import { FeaturedPosts } from "@/components/home-page/FeaturedPosts";
import { Hero } from "@/components/home-page/Hero";

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Paras Blog</title>
        <meta name="description" content="Programming and Web development"/>
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export default HomePage;
