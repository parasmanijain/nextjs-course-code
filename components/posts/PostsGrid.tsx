import { PostItem } from "./PostItem";
import classes from "./PostsGrid.module.scss";

export const PostsGrid = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post}/>
      ))}
    </ul>
  );
};
