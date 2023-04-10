import styles from "<redux>/styles/Home.module.css";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "./../assets/includes/header";
import Footer from "./../assets/includes/footer";
import MainTop from "./main-top";
import MainBot from "./main-bot";
import MainMid from "./main-mid";
import MainLog from "./main-log";
import SmallHeader from "./smallheader";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const sessionUsername = sessionStorage.getItem("username");
    if (sessionUsername) {
      setUsername(sessionUsername);
    }
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!username && (
          <>
            <Header></Header>
            <MainTop></MainTop>
            <MainMid></MainMid>
            <MainBot></MainBot>
          </>
        )}
        {username && (
          <>
            <SmallHeader></SmallHeader>
            <MainLog></MainLog>
          </>
        )}
        <Footer></Footer>
      </main>
    </>
  );
}
