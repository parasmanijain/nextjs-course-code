import { MainNavigation } from "./MainNavigation";

export const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
};
