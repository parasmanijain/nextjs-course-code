import { useEffect, useRef, useState } from "react";
import classes from "./ContactForm.module.scss";
import { Notification } from "../ui/Notification";

type RequestStatus = "pending" | "success" | "error";

const sendContactData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went w");
  }
};

export const ContactForm = () => {
  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const formInputRef = useRef(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(
    null
  );
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    const newMessage = {
      name: nameInputRef.current.value,
      message: messageInputRef.current.value,
      email: emailInputRef.current.value,
    };
    setRequestStatus("pending");
    try {
      await sendContactData(newMessage);
      setRequestError(null);
      setRequestStatus("success");
      formInputRef.current.reset();
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  };

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: requestStatus,
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: requestStatus,
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: requestStatus,
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form
        className={classes.form}
        onSubmit={sendMessageHandler}
        ref={formInputRef}
      >
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
      {notification && <Notification {...notification} />}
    </section>
  );
};
