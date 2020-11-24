const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const sequelize = require("./src/config/mysql");

const graphQlSchema = require("./src/graphql/schema/index");
const graphQlResolvers = require("./src/graphql/resolvers/index");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

app.listen(3001);
