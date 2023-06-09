import { useQuery, gql } from '@apollo/client';

const GET_HELLO = gql`query ExampleQuery {hello}`;
const GET_HERO = gql`query getHero {hero}`;

export const helloWorld = () => {
    return useQuery(GET_HELLO);
}

export const getHero = () =>{
    return useQuery(GET_HERO);
}

export const getHeroFriends = () =>{

}

