import { ApolloServer } from "@apollo/server"
// import { startStandaloneServer } from "@apollo/server/standalone"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
// import { readFileSync } from 'fs';
// import { resolve, dirname } from 'path';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
//import url from 'url';
import typeDefs from "./src/schema.mjs";

//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

//const GRAPHQL_SCHEMA_PATH = resolve(__dirname, 'schema.graphql');
//const typeDefs = readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' });

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world',
        hero: () => {
            return {
                firstName: 'Luke',
                lastName: 'Skywalker',
                friends: [{
                    firstName: 'R2',
                    lastName: 'D2',
                }, {
                    firstName: 'Yoda',
                    lastName: 'Yoda',
                }]
            }
        }
    },
};


const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000`);