import classes from "./CommentList.module.scss";

export const CommentList = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item.id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};
