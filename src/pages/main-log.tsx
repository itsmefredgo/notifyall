import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    }
  });
  return (
    <>
      <div className="loggedin-main">
        <h1 className="loggedin-title">Welcome, {username}!</h1>
        <Link href="/groups">
          <button className="loggedin-button">View Your Groups Here</button>
        </Link>
        <Link href="/creategroup">
          <button className="loggedin-button">Create a new group here</button>
        </Link>
      </div>
    </>
  );
}
