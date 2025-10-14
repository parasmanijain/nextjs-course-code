import Link from "next/link";
import classes from "./Button.module.scss";

export const Button = ({ children, link }) => {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};
