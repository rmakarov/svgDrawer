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
import mongoose from 'mongoose';
//import url from 'url';
import typeDefs from "./src/schema.mjs";

//const __filename = url.fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

//const GRAPHQL_SCHEMA_PATH = resolve(__dirname, 'schema.graphql');
//const typeDefs = readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' });

const MONGO_URI = "mongodb://localhost:27017/Heroes";

// Database connection
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Db Connected`);
    })
    .catch(err => {
        console.log(err.message);
    });
const heroesSchema = mongoose.Schema({
    id: String,
    name: String,
    city: String,
    age: String
}, {collection: 'heroesCollection'})

const heroesModel = mongoose.model('heroes', heroesSchema);
const heroes = await heroesModel.find();
console.log('heroes: ', heroes);


// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => 'world',
        heroes: () => heroes,
        hero: (parent, args) => heroes.find(hero => hero.name === args.name),
    },
    Mutation: {
        addHero: async (parent, args) => {
            const newHero = new heroesModel({
                id: args.id,
                name: args.name,
                city: args.city,
                age: args.age
            })
            await newHero.save();
            return newHero;
        },
        deleteHero: async (parent, args) => {
            heroes.findByIdAndDelete(args.id)
        }
    }
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