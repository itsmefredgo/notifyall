export default function Home() {
  return (
    <div className="create-container">
      <p className="create-text">
        Create lists of different people! They can have either an email address.
        When you want to send a message to a group of people, simple select the
        group you want to notify, write up your message, and simply send!
      </p>
      <p className="create-contact">Contact Us:</p>
      <p className="create-contact">
        Hi there, my name is <span className="create-name">Frederick Go</span>,
        the one and only developer of Notify All.
      </p>
      <p className="create-contact">
        You can contact me via the following methods:
      </p>
      <p className="create-contact">
        Email:{" "}
        <a href="mailto:dn282145@dal.ca" className="create-email">
          dn282145@dal.ca
        </a>
      </p>
    </div>
  );
}
