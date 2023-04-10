// Imports
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import main_background_image from "<redux>/assets/images/bg-image.png";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      {!username && (
        <div className="main-background-image">
          <div className="main-welcome-message">
            <span>Notify All</span>
          </div>
          <Image
            src={main_background_image}
            alt="main background image"
            placeholder="blur"
            className="main-background-image-content"
          ></Image>
        </div>
      )}
      {username && (
        <div className="main-background-image-small">
          <div className="main-welcome-message">
            <span>Notify All</span>
          </div>
          <Image
            src={main_background_image}
            alt="main background image"
            placeholder="blur"
            className="main-background-image-content"
          ></Image>
          <Link href="/logout" className="to-signout">
            <button>Sign Out</button>
          </Link>
        </div>
      )}
    </header>
  );
}
