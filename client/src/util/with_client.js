import React from 'react';
import { useApolloClient } from 'react-apollo';

export function withClient(Component) {
    return function WrappedComponent(props) {
        const client = useApolloClient();

        return <Component {...props} client={client} />
    }
}