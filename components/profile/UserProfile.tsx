import { ProfileForm } from "./ProfileForm";
import classes from "./UserProfile.module.scss";

export const UserProfile = ({session}) => {
console.log(session);
  const changePasswordHandler = async({ oldPassword, newPassword}) => {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword, newPassword}),
      headers:{
        "Content-Type":"application/json"
      }
    });

    const data = await response.json();
    
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
};
