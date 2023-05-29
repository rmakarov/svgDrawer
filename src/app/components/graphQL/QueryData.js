import React, {useEffect} from "react";
import {helloWorld} from "../../api/graphql/testApi";
import {Box, Button} from "@mui/material";


export function QueryData ()  {
    let {loading, error, data} =  helloWorld()
    if(error){console.log('error', error)}
    if(loading){console.log('loading', loading)}
    if(data){console.log('data', data)}
    return (<Box>
                <Button>get name</Button>
            </Box>)
    }