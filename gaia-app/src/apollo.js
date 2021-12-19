// import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';

// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem('token') || null,
//     }
//   }));

//   return forward(operation);
// })

// export default new ApolloClient({
//   connectToDevTools:true,
//   cache: new InMemoryCache(),
//   link: concat(authMiddleware, httpLink),
// });

// import { ApolloClient, InMemoryCache } from '@apollo/client';

// export default  new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   connectToDevTools:true,
//   cache: new InMemoryCache()
// });


import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


  