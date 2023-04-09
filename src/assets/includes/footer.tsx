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
        © 2023 Frederick Donghyeon Go. All Rights Reserved.
        <br />* Note that Notify Sphere was built as an academic project of CSCI
        4145 course.
      </div>
    </>
  );
}
