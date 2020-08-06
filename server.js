const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");
const server = express();

server.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`JSON-Placeholder Graphiql UI on ${PORT}`));