const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4001 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
}

const typeDefs = `
type User {
  name: String
}
`;

resolvers = {
  User: {
    name: () => "tutanck",
  },
};

startApolloServer(typeDefs, resolvers);
