import { PostsGrid } from '../posts/PostsGrid';
import classes from './FeaturedPosts.module.scss';

export const FeaturedPosts = ({posts}) => {
  return <section className={classes.latest}>
    <h2>Featured Posts</h2>
    <PostsGrid posts={posts}/>
  </section>;
};
