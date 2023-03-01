import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "<redux>/styles/Home.module.css";

import main_background_image from "<redux>/assets/images/bg-image.png";
import mapped_houses from "<redux>/assets/images/mapped-houses.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Mynerve&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main className={styles.main}>
        <div className="main-background-image">
          <div className="main-welcome-message">
            <span>Notify Sphere</span>
          </div>
          <Image
            src={main_background_image}
            alt="main background image"
            placeholder="blur"
            className="main-background-image-content"
          ></Image>
        </div>

        <div className="main-top">
          <div className="main-top-heading">Welcome to Notify Sphere!</div>
          <div className="main-top-about-us">What is Notify Sphere?</div>
          <div className="main-top-description">
            <div>Hello!</div>
            <div>
              Notify Sphere is a service where you can manage lists of contacts
            </div>
            <div>and send notifications / messages</div>
            <div>to all members of groups you desire!</div>
            <Image
              src={mapped_houses}
              alt="main background image"
              placeholder="blur"
              className="mapped-houses"
            ></Image>
            <div>
              We also translate messages to different languages you desire
            </div>
            <div>brought to you by AWS Translate Service!</div>
          </div>
        </div>

        <div className="main-middle">
          <div className="main-middle-heading">Time to notify!</div>
          <div className="main-middle-boxes">
            <div className="main-middle-left">
              <div>Don't have an account?</div>
              <div>Register for free today here!</div>
              <button>Sign Up</button>
            </div>
            <div className="main-middle-right">
              <div>Already have an account?</div>
              <div>Log in with your existing account here!</div>
              <button>Log In</button>
            </div>
          </div>
        </div>

        <div className="main-bottom">
          <div className="main-bottom-servicetypes">Service:</div>
          <div className="main-bottom-servicetypes-content">
            <div>
              Create lists of different people! They can have either an email
              address or a phone number. Also, assign a language!
            </div>
            <div>
              When you want to send a message to a group of people, simple
              select the group you want to notify, write up your message, and
              simply send!
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

        <div className="footer">
          © 2023 Frederick Donghyeon Go. All Rights Reserved.
          <br />* Note that Notify Sphere was built as an academic project of
          CSCI 4145 course.
        </div>
      </main>
    </>
  );
}
