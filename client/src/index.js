import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
// import { ApolloLink } from "apollo-link";
import { HashRouter } from "react-router-dom";
import { VERIFY_USER } from './graphql/mutations';

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null
});

let httpUri;
if (process.env.NODE_ENV === "production") {
    httpUri = `/graphql`;
} else {
    httpUri = "http://localhost:5000/graphql";
}

const httpLink = createHttpLink({
    uri: httpUri,
    headers: {
        authorization: localStorage.getItem("auth-token") || ""
    }
});

// make sure we log any additional errors we receive
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

let wsUri;
if (process.env.NODE_ENV === "production") {
    wsUri = "wss://" + window.location.host + "/";
} else {
    wsUri = "ws://localhost:5000/";
}

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    // uri: "ws://localhost:5000/",
    uri: wsUri,
    options: {
        reconnect: true,
        // lazy: true,
        connectionParams: {
            authorization: localStorage.getItem("auth-token") || ""
        }
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// Now, queries and mutations will go over HTTP as normal, but subscriptions will be done over the websocket transport.
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
    // errorLink
);

const client = new ApolloClient({
    // link: ApolloLink.from([errorLink, httpLink]),
    link,
    cache,
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
});

// if we have a token we want to verify the user is actually logged in
const token = localStorage.getItem("auth-token");
// to avoid components async problems where
// a component would try to read the cache's value of isLoggedIn
// before our mutation goes through we can set it up here
cache.writeData({
    data: {
        isLoggedIn: Boolean(token),
        currentUserId: localStorage.getItem("currentUserId")
    }
});

// then if we do have a token we'll go through with our mutation
if (token) {
    client
        // use the VERIFY_USER mutation directly use the returned data to know if the returned
        // user is loggedIn
        .mutate({ mutation: VERIFY_USER, variables: { token } })
        .then(({ data }) => {
            cache.writeData({
                data: {
                    isLoggedIn: data.verifyUser.loggedIn,
                    currentUserId: data.verifyUser._id
                }
            });
        });
}

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
