import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import App from './App';
import React from 'react';

const httplink = createHttpLink({
    uri: "http://localhost:5000"
})

const client = new ApolloClient({
    link: httplink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
