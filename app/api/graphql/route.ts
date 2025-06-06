import { resolvers, typeDefs } from "@/graphql";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    // Можно пробрасывать токен, юзера и т.д.
    return {};
  },
});

export { handler as GET, handler as POST }; // важно!
