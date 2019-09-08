const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require('./types');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();
