import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Image from "next/image";
import main_background_image from "<redux>/assets/images/bg-image.png";
import mapped_houses from "<redux>/assets/images/mapped-houses.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="main-top">
      <div className="main-top-heading">Welcome to Notify All!</div>
      <div className="main-top-about-us">What is Notify All?</div>
      <div className="main-top-description">
        <div>Hello!</div>
        <div>
          Notify All is a service where you can manage lists of contacts
        </div>
        <div>and send notifications / messages</div>
        <div>to all members of groups you desire!</div>
        <Image
          src={mapped_houses}
          alt="main background image"
          placeholder="blur"
          className="mapped-houses"
        ></Image>
      </div>
    </div>
  );
}
