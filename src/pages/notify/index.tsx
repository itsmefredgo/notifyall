import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Header from "../../assets/includes/header";
import Footer from "../../assets/includes/footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header></Header>
      <Link href="/">Back to main page</Link>
      LETS NOTIFY!
      <Footer></Footer>
    </>
  );
}
