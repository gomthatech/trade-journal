var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");
// TODO remove
const cors = require("cors");

var app = express();
app.use(cors());

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type User {
          _id: ID!
          name: String!
          phone: String!
          email: String!
        }
        input UserInput {
         name: String
          phone: String
          email: String
          uid: String
        }
        type RootQuery {
            users: [User!]!
            findUserByUid(uid: String!): User!
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
  findUserByUid: ({ uid }) => {
    return User.findOne({ uid }).then((userObj) => {
      return { ...userObj._doc, _id: userObj.id };
    });
  },
  createUser: (args) => {
    const userObj = new User({
      name: args.userInput.name,
      phone: args.userInput.phone,
      email: args.userInput.email,
      uid: args.userInput.uid,
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
mongoose
  .connect(
    `mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@cluster0.jrn2x.mongodb.net/trade-journal-dev?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((error) => {
    console.log(error);
    throw new Error(error);
  });
