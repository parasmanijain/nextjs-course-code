import { MainHeader } from "./MainHeader";

export const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};
