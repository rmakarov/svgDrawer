import React from 'react';
import {useQuery, gql} from '@apollo/client'
import {Box, Table, TableBody, TableHead, TableRow, TableCell, Typography} from '@mui/material';

const GET_HEROES = gql`
    query GetHeroes {
        heroes {
            name,
            age,
            city
        }
    }
`;

function Heroes() {
    const {loading, error, data} = useQuery(GET_HEROES);
    console.log('loading: ', loading)
    console.log('data: ', data)

    return (
        <Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Typography variant="h2">Heroes</Typography>
            </Box>

            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Box pl={4} pr={4}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            (data.map())

                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}

export default Heroes;
