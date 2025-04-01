import { graphqlApiUrl } from "@/constants/api";
import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { cache } from "react";

export const getClient = cache(
  (customHeaders?: Record<string, string | string[] | undefined>): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri: graphqlApiUrl,
        fetch,
        headers: customHeaders as Record<string, string>,
      }),
      cache: new InMemoryCache(),
    });
  }
);
