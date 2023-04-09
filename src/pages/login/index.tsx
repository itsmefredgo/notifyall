import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Header from "../../assets/includes/header";
import Footer from "../../assets/includes/footer";
import LoginForm from "./loginform"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  return (
    <>
      <Header></Header>
      <LoginForm></LoginForm>
      <Footer></Footer>
    </>
  );
}
