import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { useSettingsStore } from '@/stores/settings-store';
import { useNetworkStore } from '@/stores/network-store';
import { DEFAULT_NETWORKS } from '@/lib/networks';

const httpLink = new HttpLink({
  fetch: (async (uri: RequestInfo | URL, options?: RequestInit) => {
    const { networkId } = useSettingsStore.getState();

    const { networks } = useNetworkStore.getState();
    const network = networks[networkId] || DEFAULT_NETWORKS['mainnet'];
    const endpoint = network?.url || DEFAULT_NETWORKS['mainnet'].url;

    return fetch(endpoint, options);
  }) as unknown as typeof fetch,
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export const initCache = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
};
