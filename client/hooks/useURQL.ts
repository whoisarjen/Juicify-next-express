import { createClient, dedupExchange, fetchExchange, subscriptionExchange, Client, Exchange } from 'urql';
import { createClient as createWSClient } from 'graphql-ws';
import { Provider } from 'urql';
import { getIntrospectionQuery } from 'graphql';
import { offlineExchange } from '@urql/exchange-graphcache';
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage';
import { useEffect, useState } from 'react';

const graphqlEndpoint = process.env!.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;
const graphqlWebsocketEndpoint = process.env!.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT as string;

export const useURQL = () => {
	const [UrqlClient, setUrqlClient] = useState<Client>(
		createClient({
			url: graphqlEndpoint,
			requestPolicy: 'cache-and-network',
			fetchOptions: () => ({
				credentials: 'include',
			}),
		})
	);

	useEffect(() => {
		(async () => {
			setUrqlClient(await createUrqlClient())
		})()
	}, [])

	return { UrqlClient }
}

export const fetchGraphQLschema = async () => {
    try {
        let responseData = null;
        await fetch('http://localhost:5000/graphql', {
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
            responseData = data
        });
        return responseData
    } catch {}
}

export const getGraphQLschema = () => localStorage.getItem('schema')

export const createUrqlClient = async (): Promise<Client> => {
    const cachedSchema = getGraphQLschema()
    const schema = cachedSchema ? JSON.parse(cachedSchema) : await fetchGraphQLschema()

    const storage = makeDefaultStorage({
        idbName: 'graphcache-v3', // The name of the IndexedDB database
        maxAge: 7, // The maximum age of the persisted data in days
    });

    const cache = offlineExchange({
        schema,
        storage,
        updates: {
        	/* ... */
        },
        optimistic: {
        	/* ... */
        },
    });

    const exchanges: Exchange[] | undefined = [dedupExchange, cache, fetchExchange]

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

export const ProviderURQL = Provider;