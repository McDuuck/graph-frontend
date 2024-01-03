import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { setContext } from 'apollo-link-context'
import { 
    ApolloClient, 
    InMemoryCache, 
    gql,
    ApolloProvider,
    createHttpLink
} from '@apollo/client'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('book-user-token')
  return {
    headers: {
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

const query = gql`
  query {
    allAuthors  {
      name
      born
    }
    allBooks {
      title
      published
      author
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })


ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)