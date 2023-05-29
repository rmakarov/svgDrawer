import React, { Component } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/home/Home.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),

});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Home />}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;