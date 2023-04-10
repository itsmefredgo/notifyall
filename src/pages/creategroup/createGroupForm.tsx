// Imports
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function CreateNewGroup() {
  // New Group name and username
  const [newgroupname, setnNewgroupname] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieving username from session stored.
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    }
  });

  // Ob submit, calls the Create Group API
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // If new group name is empty, warn the user.
    if (!username || !newgroupname) {
      setErrorMessage("Please enter a newgroupname. ");
    } else {
      try {
        // Call the SIGNUP API gateway.
        const response = await fetch(
          `https://6ffo8aqo89.execute-api.us-east-1.amazonaws.com/notifyall/useraction`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "CREATEGROUP",
              username,
              groupname: newgroupname,
            }),
          }
        );

        // Response from the CREATEGROUP API.
        response.json().then((message) => {
          // Report the result from the CREATEGROUP lambda function.
          const messageField = JSON.parse(message["body"])["message"];
          // If sucessfully created a new group, inform the user and reroute the groups.
          if (messageField == "Successfully created a group. ") {
            alert("Oohoo! New group created!");
            router.push("/groups");
          }
          setErrorMessage(messageField);
          console.log(messageField);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-form">
      <h1 className="create-title">Create a New Group</h1>
      {errorMessage != "" && (
        <div className="create-error">*{errorMessage}*</div>
      )}
      <form className="create-form" onSubmit={onSubmit}>
        <input
          className="create-input"
          value={newgroupname}
          onChange={(event) => setnNewgroupname(event.target.value)}
          placeholder="Group Name"
        />
        <button className="create-button" type="submit">
          Create!
        </button>
      </form>
      <Link className="gobackfromcreatelist" href="/">
        <button className="create-button">Back to main page</button>
      </Link>
    </div>
  );
}
