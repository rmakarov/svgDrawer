import React, { Component } from 'react';
import {Box} from '@mui/material';
import ToolBar from '../toolBar/ToolBar';
import Interpolation from '../interpolation/Interpolation'
import {calculationBar} from '../interpolation/interpolationUtils';

class Home extends Component {
    constructor() {
        super();
        this.startCalculation = this.startCalculation.bind(this)
    }

    startCalculation() {
        console.log('startCalculation');
        calculationBar()
    }

    render() {
        return (
        <Box>
            <ToolBar/>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent={"center"}>
                <Interpolation />
            </Box>
            <Box mt={2} display="flex" flexDirection="row" alignItems="center" justifyContent={"center"}>
                <table id="interpolationResultTable">
                    <thead>
                        <tr>
                            <th>№ опыта</th>
                            <th>R, m</th>
                            <th>n</th>
                            <th>N</th>
                            <th>t, c</th>
                            <th>v, c<sup>-1</sup></th>
                            <th>u, m/c</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                             <td>
                                 1
                             </td>
                             <td>
                                <input type="number"/>
                             </td>
                             <td>

                             </td>
                             <td>
                                <span id="countOfDrops"></span>
                             </td>
                             <td>
                                 <input id="expirienceTimer" type="number" defaultValue={10}/>
                             </td>
                             <td>
                                 <input id="dropFrequency" type="number" defaultValue={1}/>
                             </td>
                             <td>

                             </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={this.startCalculation}>рассчитать</button>
                </div>
            </Box>
        </Box>
    );
    }
}

export default Home