import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import crypto from "crypto";
import Link from "next/link";
import { useEffect } from "react";

export default function CreateNewGroup() {
  const [newgroupname, setnNewgroupname] = useState("");
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const hashPassword = (password: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    }
  });
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!username || !newgroupname) {
      setErrorMessage("Please enter a newgroupname");
    } else {
      try {
        const response = await fetch(
          `https://zhwuzz7e9e.execute-api.us-east-1.amazonaws.com/test/createlist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              groupname: newgroupname,
            }),
          }
        );

        response.json().then((message) => {
          // This is set the state of error message if exists.
          const messageField = JSON.parse(message["body"])["message"];
          setErrorMessage(messageField);
          console.log(messageField);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="creategroupform">
      <h1>Create a New Group</h1>
      {errorMessage != "" && (
        <div className="loginform-error">*{errorMessage}*</div>
      )}
      <form onSubmit={onSubmit}>
        <input
          value={newgroupname}
          onChange={(event) => setnNewgroupname(event.target.value)}
          placeholder="Group Name"
        />
        <button type="submit">Create!</button>
      </form>
      <Link className="gobackfromcreatelist" href="/">
        <button>Back to main page</button>
      </Link>
    </div>
  );
}
