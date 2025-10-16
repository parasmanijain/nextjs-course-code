import { Fragment, useContext } from "react";
import { NotificationContext } from "@/store/NotificationContext";
import { Notification } from "../ui/Notification";
import { MainHeader } from "./MainHeader";

export const Layout = ({ children }) => {
  const { notification } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </Fragment>
  );
};
