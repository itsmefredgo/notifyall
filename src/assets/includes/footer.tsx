import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Image from "next/image";
import main_background_image from "<redux>/assets/images/bg-image.png";
import mapped_houses from "<redux>/assets/images/mapped-houses.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="footer">
        © 2023 Frederick Donghyeon Go. MIT LICENSED. All rights reserved.
        <br />* Note that Notify All is an academic project.{" "}
      </div>
    </>
  );
}
