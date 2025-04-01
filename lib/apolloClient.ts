import { graphqlApiUrl } from "@/constants/api";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: graphqlApiUrl,
  cache: new InMemoryCache(),
});

export default client;
