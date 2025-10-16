import { useRef } from "react";
import classes from "./NewsletterRegistration.module.scss";

export const NewsletterRegistration = () => {
  const emailInputRef = useRef(null);
  async function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const message = await response.json();
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
