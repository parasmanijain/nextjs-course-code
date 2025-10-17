import { FeaturedPosts } from "@/components/home-page/FeaturedPosts";
import { Hero } from "@/components/home-page/Hero";
import { getFeaturedPosts } from "@/lib/posts-util";

const HomePage = ({ posts }) => {
  return (
    <>
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
