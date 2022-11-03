import "../styles/app.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { WordProvider } from "../context/WordContext";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Termo</title>

        {/** Google Fonts - Open Sans*/}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500;700&display=swap"
          rel="stylesheet"
        />

        {/** Font Awesome CDN*/}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <WordProvider>
        <Component {...pageProps} />
      </WordProvider>
    </>
  );
}
