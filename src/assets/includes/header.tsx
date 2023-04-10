// Imports
import { useEffect, useState } from "react";

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
            <a href="/login" className="link">
              Login
            </a>
            <a href="/signup" className="link">
              Signup
            </a>
          </div>
          <h1 className="title">NotifyAll</h1>
        </div>
      )}
      {username && (
        <div className="container-header-login">
          <div className="links">
            <a href="/login" className="link">
              Login
            </a>
            <a href="/signup" className="link">
              Signup
            </a>
          </div>
          <h1 className="title-login">NotifyAll</h1>
        </div>
      )}
    </header>
  );
}
