import classes from "./AllPosts.module.scss";
import { PostsGrid } from "./PostsGrid";

export const AllPosts = (props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};
