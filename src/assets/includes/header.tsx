// Imports
import { useEffect, useState } from "react";
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
    <header>
      {!username && (
        <div className="container-header">
          <div className="links">
            <Link href="/login" className="link">
              Login
            </Link>
            <Link href="/signup" className="link">
              Signup
            </Link>
          </div>
          <h1 className="title">NotifyAll</h1>
        </div>
      )}
      {username && (
        <div className="container-header-login">
          <div className="links">
            <Link href="/login" className="link">
              Login
            </Link>
            <Link href="/signup" className="link">
              Signup
            </Link>
          </div>
          <h1 className="title-login">NotifyAll</h1>
        </div>
      )}
    </header>
  );
}
