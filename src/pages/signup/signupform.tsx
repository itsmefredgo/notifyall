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

    try {
      const response = await fetch(
        `https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/signup`,
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
        if (messageField == "Successfully signed up") {
          router.push("/login");
        }
      });
    } catch (error) {
      console.error(error);
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
