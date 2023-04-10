// Imports
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  // New Username and Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Ob submit, calls the sign up API
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // If either blanks are empty, warn the user.
    if (!username || !password) {
      setErrorMessage("Please enter username and password. ");
    } else {
      try {
        // Call the SIGNUP API gateway.
        const response = await fetch(
          `https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/userauthentication`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              call: "SIGNUP",
              username,
              password,
            }),
          }
        );

        // Response from the LOGIN API.
        response.json().then((message) => {
          // Report the result from the SIGNUP lambda function.
          const messageField = JSON.parse(message["body"])["message"];
          // If successfully signed up, move to log in page.
          if (messageField == "Successfully signed up") {
            alert("Successfully signed up! Time to Notify!");
            router.push("/login");
          }
          setErrorMessage(messageField);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="loginform">
      <h1>Sign up</h1>
      <div className="loginform-error">{errorMessage}</div>
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link className="signupbutton" href="/login">
        <button>Already have an accont?</button>
      </Link>
      <Link className="goback" href="/">
        <button>Back to main page</button>
      </Link>
    </div>
  );
}
