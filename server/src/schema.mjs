import { gql } from 'graphql-tag'

const typeDefs = gql`
    type Hero {
        id: String, name: String, city: String, age: String
    }
    type Query {
        hello: String
        heroes: [Hero]
        hero(name: String!): Hero
    }
    type Mutation {
        addHero(id: String, name: String,  city: String, age: String): Hero,
        deleteHero(id: String): Hero
    }
`;
export default typeDefs;