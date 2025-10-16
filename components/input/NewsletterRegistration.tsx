import { useContext, useRef } from "react";
import { NotificationContext } from "@/store/NotificationContext";
import classes from "./NewsletterRegistration.module.scss";

export const NewsletterRegistration = () => {
  const { showNotification } = useContext(NotificationContext);
  const emailInputRef = useRef(null);

  const registrationHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    showNotification({
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
      showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter!",
        status: "success",
      });
    } catch (error) {
      showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };

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
