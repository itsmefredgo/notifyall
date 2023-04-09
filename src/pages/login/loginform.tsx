import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import crypto from "crypto";
import Link from "next/link";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const hashPassword = (password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    event.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please enter a username and password");
    } else {
      try {
        const response = await fetch(
          `https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );

        response.json().then((message) => {
          // This is set the state of error message if exists.
          const messageField = JSON.parse(message["body"])["message"];
          setErrorMessage(messageField);
          if (messageField == "Successfully logged in") {
            sessionStorage.setItem("username", username);
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
