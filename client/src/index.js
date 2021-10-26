import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import "./index.css";


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  })
});


ReactDOM.render(
  <ApolloProvider client={client}>
   <div className = 'body'> <App /> </div> 
   </ApolloProvider>,
  document.getElementById('root')
);

