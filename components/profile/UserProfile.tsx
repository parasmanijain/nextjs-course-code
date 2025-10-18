import { useSession, getSession } from "next-auth/react";
import { ProfileForm } from "./ProfileForm";
import classes from "./UserProfile.module.scss";

export const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }
  if (!session) {
    window.location.href = "/auth";
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
