import classes from "./EventContent.module.scss";

export const EventContent = ({ children }) => {
  return <section className={classes.content}>{children}</section>;
};
