import React, { Component } from 'react';
import {Box} from '@mui/material';
import ToolBar from '../toolBar/ToolBar';
import Interpolation from '../interpolation/Interpolation'

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        <Box>
            <ToolBar/>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent={"center"}>
                <Interpolation />
            </Box>
        </Box>
    );
    }
}

export default Home