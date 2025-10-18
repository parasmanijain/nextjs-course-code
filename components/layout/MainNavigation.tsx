import Link from "next/link";
import { useSession } from "next-auth/react";
import classes from "./MainNavigation.module.scss";

export const MainNavigation = () => {
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {session ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button>Logout</button>
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
