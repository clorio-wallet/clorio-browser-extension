import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NetworkConfig, NetworksMap, DEFAULT_NETWORKS } from '@/lib/networks';

interface NetworkState {
  networks: NetworksMap;
  isLoading: boolean;
  error: string | null;
  fetchNetworks: () => Promise<void>;
  getNetwork: (id: string) => NetworkConfig | undefined;
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set, get) => ({
      networks: DEFAULT_NETWORKS,
      isLoading: false,
      error: null,

      fetchNetworks: async () => {
        set({ isLoading: true, error: null });
        try {
          const orchestraUrl = import.meta.env.VITE_ORCHESTRA_URL;
          if (!orchestraUrl) {
            throw new Error('VITE_ORCHESTRA_URL is not defined');
          }

          const response = await fetch(orchestraUrl, {
            headers: {
              accept: '*/*',
              'accept-language': 'en-US,en;q=0.9',
              'cache-control': 'no-cache',
              pragma: 'no-cache',
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch networks: ${response.statusText}`);
          }

          const data: NetworksMap = await response.json();
          set({ networks: data, isLoading: false });
        } catch (error) {
          console.error('Error fetching networks:', error);
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false,
            // We keep existing networks (DEFAULT_NETWORKS or previously persisted) on error
          });
        }
      },

      getNetwork: (id: string) => {
        return get().networks[id];
      },
    }),
    {
      name: 'clorio_networks',
    },
  ),
);
