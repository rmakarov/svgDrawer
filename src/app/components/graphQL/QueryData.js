import React from "react";
import {helloWorld, getHero, getHeroFriends} from "../../api/graphql/testApi";
import {Box, Button} from "@mui/material";


export function QueryData ()  {
    let {loading, error, data} =  getHero()
    if(error){console.log('error', error)}
    if(loading){console.log('loading', loading)}
    if(data){console.log('data', data)}
    return (<Box>
                <Button>get name</Button>
            </Box>)
    }