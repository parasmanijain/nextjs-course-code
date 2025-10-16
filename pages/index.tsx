import { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef(null);
  const feedbackInputRef = useRef(null);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeddback = feedbackInputRef.current.value;
    const reqBody = {
      email: enteredEmail,
      text: enteredFeddback,
    };

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();

  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <div>
          <button>Send Feedback</button>
        </div>
      </form>
    </div>
  );
}

export default HomePage;
