import { useQuery, gql } from '@apollo/client';

const GET_DOGS = gql`query ExampleQuery {hello}`;

export const helloWorld = () => {
    return useQuery(GET_DOGS);
}

