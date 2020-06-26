import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as AuthProvider } from './context/AuthContext';

const client = new ApolloClient({
  uri: 'https://staging-api.sayduck.io/graphql',
  request: (operation) => {
    const token = sessionStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});

//Apollo Client
ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
