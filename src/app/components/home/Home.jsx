import React, { Component } from 'react';
import {Box, Button} from '@mui/material';
import ToolBar from '../toolBar/ToolBar';

class Home extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        <Box>
            <ToolBar/>
        </Box>
    );
    }
}

export default Home