import { ProfileForm } from "./ProfileForm";
import classes from "./UserProfile.module.scss";

export const UserProfile = () => {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
