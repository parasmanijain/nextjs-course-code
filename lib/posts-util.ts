import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostData {
  slug: string;
  content: string;
  date?: Date;
  isFeatured?: boolean;
}

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostData = (fileName: string) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postSlug = fileName.replace(/\.md$/, "");
  const postData: PostData = {
    slug: postSlug,
    ...data,
    content,
  };
  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postsDirectory);
  const allPosts = postFiles.map((postFile) => getPostData(postFile));
  allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
  return allPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  return featuredPosts;
};
