import Link from "next/link";

export default function Home() {
  return (
    <div className="container-mid">
      <h1 className="title-mid">Time to NotifyAll!</h1>
      <div className="buttons-mid">
        <div className="button-mid">
          <p className="text-mid">
            Don't have an account? Register for free today here!
          </p>
          <Link href="/signup" className="link-mid">
            Sign Up
          </Link>
        </div>
        <div className="button-mid">
          <p className="text-mid">
            Already have an account? Log in with your existing account here!
          </p>
          <Link href="/login" className="link-mid">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
