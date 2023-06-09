import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home.jsx'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <Home />}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;