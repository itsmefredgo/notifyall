// Imports
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  // Username and Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // On submit, calls log in API
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // If either blanks are empty, warn the user.
    if (!username || !password) {
      setErrorMessage("Please enter username and password. ");
    } else {
      try {
        // Call the LOGIN API gateway.
        const response = await fetch(
          `https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/userauthentication`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              call: "LOGIN",
              username,
              password,
            }),
          }
        );

        // Response from the LOGIN API.
        response.json().then((message) => {
          // Report the result from the LOGIN lambda function.
          const messageField = JSON.parse(message["body"])["message"];
          setErrorMessage(messageField);
          // If successfully logged in, set session and route to main.
          if (messageField == "Successfully logged in. ") {
            sessionStorage.setItem("username", username);
            alert("Log in successful! Time to Notify!");
            router.push("/");
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="signupform">
      <h1>Log in</h1>
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
        <button type="submit">Let me Notify!</button>
      </form>
      <Link className="signupbutton" href="/signup">
        <button>Create a new account</button>
      </Link>
      <Link className="goback" href="/">
        <button>Back to main page</button>
      </Link>
    </div>
  );
}
