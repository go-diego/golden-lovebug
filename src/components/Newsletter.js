import React, { useState } from "react";

const Newsletter = () => {
  const [successMessage, setSuccessMessage] = useState(null); // [1]
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState({ email: null, name: null });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setInputError((prevState) => ({ ...prevState, email: null })); // Reset email error when the email is changed
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setInputError((prevState) => ({ ...prevState, name: null })); // Reset name error when the name is changed
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!validateEmail(email)) {
      setInputError((prevState) => ({
        ...prevState,
        email: "Invalid email address"
      }));
      return;
    }

    if (!name.trim()) {
      setInputError((prevState) => ({
        ...prevState,
        name: "Name cannot be empty"
      }));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, name })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { status } = await response.json();

      if (status === "ALREADY_EXISTS") {
        setSuccessMessage("You are already subscribed!");
      }

      if (status === "SUCCESS") {
        setSuccessMessage(
          "Thank you for subscribing. Please check your email to confirm your subscription"
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setEmail("");
      setName("");
    }
  };

  React.useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="columns is-centered">
      <div className="column is-two-thirds-tablet is-half-desktop ">
        <h2 className="title is-2 has-text-centered has-text-light">
          Sign up today!
        </h2>
        <p className="subtitle is-5 has-text-centered has-text-light">
          Subscribe to my newsletter to get new blog posts and updates right to
          your inbox.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              value={name}
              onChange={handleNameChange}
              className={`input ${inputError.name ? "is-danger" : ""}`}
              type="text"
              placeholder="Enter your name"
            />
            {inputError.name && (
              <p className="help is-danger">{inputError.name}</p>
            )}
          </div>

          <div className="field">
            <input
              value={email}
              onChange={handleEmailChange}
              className={`input ${inputError.email ? "is-danger" : ""}`}
              type="text"
              placeholder="Enter your email address"
            />
            {inputError.email && (
              <p className="help is-danger">{inputError.email}</p>
            )}
          </div>

          <div className="control">
            <button
              disabled={
                loading ||
                inputError.email ||
                inputError.name ||
                !email ||
                !name
              }
              className={`button is-primary ${loading ? "is-loading" : ""}`}>
              Subscribe
            </button>
          </div>
        </form>

        {error && (
          <div
            class="notification is-error is-size-7"
            style={{
              backgroundColor: "#feecf0",
              color: "#cc0f35",
              marginTop: "0.5rem"
            }}>
            {error}
          </div>
        )}
        {successMessage && (
          <div
            class="notification is-success is-size-7"
            style={{
              backgroundColor: "#effaf5",
              color: "#257953",
              marginTop: "0.5rem"
            }}>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
