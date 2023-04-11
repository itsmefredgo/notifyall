import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Header from "../smallheader";
import Footer from "../../assets/includes/footer";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  function signout() {
    sessionStorage.clear();
    router.push("/");
  }

  return (
    <div className="Logout-page">
      <Header></Header>
      <div className="loggedin-main">
        <h1 className="loggedin-title">Log out?</h1>
        <button onClick={signout} className="loggedin-button">
          Yes, log me out!
        </button>
        <Link href="/">
          <button className="loggedin-button">No, go back!</button>
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}
