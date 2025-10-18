import { useSession, getSession } from "next-auth/react";
import { ProfileForm } from "./ProfileForm";
import classes from "./UserProfile.module.scss";

export const UserProfile = ({session}) => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
