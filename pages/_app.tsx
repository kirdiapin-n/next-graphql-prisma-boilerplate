import Header from "@/layout/Header";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "@/styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
