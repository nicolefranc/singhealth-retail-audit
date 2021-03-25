import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
    uri: 'http://localhost:5000' // pointing to the server
    // uri: 'https://sra-gql.herokuapp.com/' // production
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)
