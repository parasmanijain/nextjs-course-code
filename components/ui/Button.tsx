import { ReactNode } from "react";
import Link from "next/link";
import classes from "./Button.module.scss";

export const Button = ({
  children,
  link,
  onClick,
}: {
  children: ReactNode;
  link?: string;
  onClick?: () => {};
}) => {
  if (link) {
    return (
      <Link href={link} className={classes.btn}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};
