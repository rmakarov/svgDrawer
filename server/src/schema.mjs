import { gql } from 'graphql-tag'

const typeDefs = gql`
type Track {
        id: ID!
        title: String!
    }
    type HeroFriends {
        firstName: String, lastName: String
    }
    type Hero {
        firstName: String, lastName: String, friends: [HeroFriends]
    }
    type Mutation {
        addHero(title: String, author: String): Hero
    }
    type Query {
        hello: String
        hero: Hero
    }
`;

export default typeDefs;