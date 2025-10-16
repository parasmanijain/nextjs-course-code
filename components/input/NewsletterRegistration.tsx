import { useContext, useRef } from "react";
import classes from "./NewsletterRegistration.module.scss";
import { NotificationContext } from "@/store/NotificationContext";

export const NewsletterRegistration = () => {
  const notificationCtx = useContext(NotificationContext);
  const emailInputRef = useRef(null);
  async function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      }
      const data = await response.json();
      notificationCtx.showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter!",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
