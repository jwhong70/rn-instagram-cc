import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://270f-175-211-184-84.jp.ngrok.io/graphql",
  cache: new InMemoryCache(),
});
export default client;
