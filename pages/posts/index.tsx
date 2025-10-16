import { AllPosts } from "@/components/posts/AllPosts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started With Nextjs",
    image: "getting-started-nextjs.png",
    date: "2025-10-17",
    excerpt: "NextJS is a React framework for production.",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started With Nextjs",
    image: "getting-started-nextjs.png",
    date: "2025-10-16",
    excerpt: "NextJS is a React framework for production.",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started With Nextjs",
    image: "getting-started-nextjs.png",
    date: "2025-09-01",
    excerpt: "NextJS is a React framework for production.",
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started With Nextjs",
    image: "getting-started-nextjs.png",
    date: "2024-12-31",
    excerpt: "NextJS is a React framework for production.",
  },
];

const AllPostsPage = () => {
  return (
    <AllPosts posts={DUMMY_POSTS}/>
  )
}

export default AllPostsPage