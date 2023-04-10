import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";
import Image from "next/image";
import main_background_image from "<redux>/assets/images/bg-image.png";
import mapped_houses from "<redux>/assets/images/mapped-houses.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="main-bottom">
        <div className="main-bottom-servicetypes">Service:</div>
        <div className="main-bottom-servicetypes-content">
          <div>
            Create lists of different people! They can have either an email
            address.
          </div>
          <div>
            When you want to send a message to a group of people, simple select
            the group you want to notify, write up your message, and simply
            send!
          </div>
        </div>
        <div className="main-bottom-contactus">Contact Us:</div>
        <div className="main-bottom-contactus-content">
          <div>
            Hi there, my name is Frederick Go, the one and only developer of
            Notify All.
          </div>
          <div>You can contact me via the following methods: </div>
          <ul>
            <li>- Email: dn282145@dal.ca</li>
          </ul>
        </div>
      </div>
    </>
  );
}
