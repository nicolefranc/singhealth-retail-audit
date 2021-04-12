import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import store from './store';
import { createUploadLink } from 'apollo-upload-client';
import { cache } from './cache';
import { typeDefs } from './graphql/typeDefs';
import { TOKEN } from './const';

const httpLink = createUploadLink({
    // uri: 'http://localhost:5000' // pointing to the server
    uri: 'https://sra-gql.herokuapp.com/' // production
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // link: httpLink,
    cache,
    typeDefs
});

export default (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
)
