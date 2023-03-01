import "<redux>/styles/globals.css";
import "<redux>/styles/main.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
