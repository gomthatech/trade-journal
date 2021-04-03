var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const User = require("./models/user");
var app = express();
app.use(bodyParser.json());
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
          _id: ID!
          name: String!
          phone: String!
          email: String!
        }
        input UserInput {
         name: String!
          phone: String!
          email: String!
        }
        type RootQuery {
            users: [User!]!
        }
        type RootMutation {
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);

// The root provides a resolver function for each API endpoint
var root = {
  users: () => {
    return User.find()
      .then((users) => {
        return users.map((userObj) => {
          return { ...userObj._doc, _id: userObj.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createUser: (args) => {
    const userObj = new User({
      name: args.userInput.name,
      phone: args.userInput.phone,
      email: args.userInput.email,
    });
    return userObj
      .save()
      .then((result) => {
        console.log(result);
        return { ...result._doc, _id: result._doc._id.toString() };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://${`${process.env.DB_USER}`}:${`${process.env.DB_PASSWORD}`}@cluster0.jrn2x.mongodb.net/trade-journal-dev?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
    throw new Error(error);
  });
