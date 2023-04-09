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
            address or a phone number. Also, assign a language!
          </div>
          <div>
            When you want to send a message to a group of people, simple select
            the group you want to notify, write up your message, and simply
            send!
          </div>
          <div>
            If optional language is set for specific users, your message will
            automatically translated to the desired language!
          </div>
        </div>
        <div className="main-bottom-contactus">Contact Us:</div>
        <div className="main-bottom-contactus-content">
          <div>
            Hi there, my name is Frederick Go, the one and only developer of
            Notify Sphere.
          </div>
          <div>You can contact me via the following methods: </div>
          <ul>
            <li>- Email: hello@notifysphere.com</li>
            <li>- Cell: 123-456-7890</li>
          </ul>
        </div>
      </div>
    </>
  );
}
