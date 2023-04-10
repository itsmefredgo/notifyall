import Image from "next/image";
import mapped_houses from "<redux>/assets/images/mapped-houses.png";

export default function Home() {
  return (
    <div className="container-top">
      <h1 className="title-top">Welcome to Notify All!</h1>
      <h2 className="subtitle">What is Notify All?</h2>
      <p className="text">Hello!</p>
      <p className="text">
        Notify All is a service where you can manage lists of contacts
      </p>
      <p className="text">and send notifications / messages</p>
      <p className="text">to all members of groups you desire!</p>
      <Image
        src={mapped_houses}
        alt="main background image"
        placeholder="blur"
        className="mapped-houses"
      ></Image>
    </div>
  );
}
