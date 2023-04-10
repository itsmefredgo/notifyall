// Imports

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    }
  });

  return (
    <header>
      <div className="header-small">
        {!username && (
          <>
            <a className="button-small-header" href="/">
              NotifyAll
            </a>
          </>
          // </div>
        )}
        {username && (
          <>
            <a className="button-small-header" href="/">
              NotifyAll
            </a>
            <a href="/logout" className="link-small-header">
              Sign Out
            </a>
          </>
        )}
      </div>
    </header>
  );
}
