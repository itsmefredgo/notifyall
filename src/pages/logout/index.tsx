import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Header from "../../assets/includes/header";
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
      <div className="logout-content">
        <div>Are you sure you want to logout?</div>
        <button onClick={signout}>Yes, log me out!</button>
        <div>
          <Link href="/">
            <button>No! Back to main page!</button>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
