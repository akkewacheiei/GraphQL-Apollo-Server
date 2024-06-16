const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    name: String
    age: Int
    position: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(name: String, age: String, position: String): User
  }
`;

let users = [
  { name: "New", age: 22, position: "student" },
  { name: "Cristiano Ronaldo", age: 34, position: "footballer" },
  { name: "Emma Stone", age: 33, position: "actress" },
];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    createUser: (parents, args) => {
      const newUser = args;
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`server ready at port ${url}`);
});
