import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import classes from "./MainNavigation.module.scss";

export const MainNavigation = () => {
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    await signOut();
  };
  
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {session && status !== "loading" ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
