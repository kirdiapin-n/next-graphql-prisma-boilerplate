"use client";

import Header from "@/layout/Header";
import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import theme from "./theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div id="app">
          <Header />
          <main>{children}</main>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}
