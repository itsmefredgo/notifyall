import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Image from "next/image";
import main_background_image from "<redux>/assets/images/bg-image.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
      <div className="main-background-image">
        {username && (
          <>
            <Link href="/logout" className="to-signout">
              <button>Sign Out</button>
            </Link>
          </>
        )}
        <div className="main-welcome-message">
          <span>Notify Sphere</span>
        </div>
        <Image
          src={main_background_image}
          alt="main background image"
          placeholder="blur"
          className="main-background-image-content"
        ></Image>
      </div>
    </header>
  );
}
