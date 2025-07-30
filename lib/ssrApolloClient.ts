import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { cache } from "react";
import { headers } from "next/headers";

export const getClient = cache(
  (customHeaders?: Record<string, string | string[] | undefined>): ApolloClient<NormalizedCacheObject> => {
    const host = (headers() as unknown as { get: (v: string) => string }).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const uri = `${protocol}://${host + "/api/graphql"}`;

    return new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri,
        fetch,
        headers: customHeaders as Record<string, string>,
      }),
      cache: new InMemoryCache(),
    });
  }
);
