import { useRef } from "react";
import classes from "./ContactForm.module.scss";

export const ContactForm = () => {
  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const newMessage = {
    name: nameInputRef.current.value,
    message: messageInputRef.current.value,
    email: emailInputRef.current.value,
  };

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(newMessage),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const message = await response.json();
    console.log(message);
  };

  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows={5} required ref={messageInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};
