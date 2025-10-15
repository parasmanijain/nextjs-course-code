import { ComponentType } from "react";
import classes from "./LogisticsItem.module.scss";

export const LogisticsItem = ({ icon, children }) => {
  const IconElement: ComponentType = icon;
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <IconElement />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};
