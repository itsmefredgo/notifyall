// Imports
import Link from "next/link";

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
            <Link className="button-small-header" href="/">
              NotifyAll
            </Link>
          </>
        )}
        {username && (
          <>
            <Link className="button-small-header" href="/">
              NotifyAll
            </Link>
            <Link href="/logout" className="link-small-header">
              Sign Out
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
