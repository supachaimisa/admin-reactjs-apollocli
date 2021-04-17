import { ApolloClient , InMemoryCache } from '@apollo/client';
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3333/graphql"
});
export default client