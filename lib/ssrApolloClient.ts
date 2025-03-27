import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { cache } from "react";

export const getClient = cache(
  (customHeaders?: Record<string, string | string[] | undefined>): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
        fetch,
        headers: customHeaders as Record<string, string>,
      }),
      cache: new InMemoryCache(),
    });
  }
);
