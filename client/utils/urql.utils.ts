import { createClient, dedupExchange, cacheExchange, subscriptionExchange, Client, Exchange } from 'urql';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { createClient as createWSClient } from 'graphql-ws';
import { Provider } from 'urql';
import { getIntrospectionQuery } from 'graphql';

export const fetchGraphQLschema = () => {
    try {
        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                variables: {},
                query: getIntrospectionQuery({ descriptions: false }),
            }),
        })
        .then(result => result.json())
        .then(({ data }) => {
            localStorage.setItem('schema', JSON.stringify(data))
        });
    } catch {}
}

// fetchGraphQLschema()

export const getGraphQLschema = () => localStorage.getItem('schema')

export const createUrqlClient = (): Client => {
    const graphqlEndpoint = process.env!.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;
    const graphqlWebsocketEndpoint = process.env!.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT as string;

    let exchanges: Exchange[] | undefined = [dedupExchange, cacheExchange, multipartFetchExchange];

    if (typeof window !== 'undefined') {
        const wsClient = createWSClient({
            url: graphqlWebsocketEndpoint,
        });

        const subExchange = subscriptionExchange({
            forwardSubscription: operation => ({
                subscribe: sink => ({
                    unsubscribe: wsClient.subscribe(operation, sink),
                }),
            }),
        });

        exchanges.push(subExchange);
    }

    const client = createClient({
        url: graphqlEndpoint,
        requestPolicy: 'cache-and-network',
        exchanges,
        fetchOptions: () => ({
            credentials: 'include',
        }),
    });

    return client;
};

export const UrqlClient = createUrqlClient()

export const ProviderURQL = Provider;