import classes from "./ErrorAlert.module.scss";

export const ErrorAlert = ({ children }) => {
  return <div className={classes.alert}>{children}</div>;
};
