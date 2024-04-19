const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const {default: axios} = require('axios')

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String
    }
      type Todo {
        id: ID!
        title: String!
        completed: Boolean
        userId: ID!
      }

      type Query {
        getTodos: [Todo]
        getAllUsers: [User]
        getUser(id: ID!): User
      }
    `,
    resolvers: {
      Query: {
        getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        getAllUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        getUser: async (parent, {id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
      },
    },
  }); 

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server started at port 8000");
  });
};

startServer();
 