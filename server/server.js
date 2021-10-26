const express = require('express')
const {ApolloServer} = require('apollo-server-express')

const schema = require('./graphql/graphqlSchema')
const resolvers = require('./graphql/resolvers')
PORT = 5000

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    const app = express();
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    
    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
})
}

startApolloServer(schema, resolvers);