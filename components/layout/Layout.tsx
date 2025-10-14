import { Fragment } from "react";
import { MainNavigation } from "./MainNavigation";

export const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};
