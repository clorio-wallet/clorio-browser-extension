export interface NetworkConfig {
  name: string;
  url: string; // GraphQL endpoint
  network: string; // e.g., 'mainnet', 'testnet'
  label: string; // id, e.g., 'mainnet', 'devnet'
  epochUrl: string;
  explorerUrl: string;
}

export type NetworkId = string;

export type NetworksMap = Record<NetworkId, NetworkConfig>;

// Default fallback networks (mirrors the API response structure roughly for safety)
export const DEFAULT_NETWORKS: NetworksMap = {
  mainnet: {
    name: 'Mainnet',
    url: import.meta.env.VITE_MAINNET_GQL_URL || '',
    network: 'mainnet',
    label: 'mainnet',
    epochUrl: import.meta.env.VITE_MAINNET_EPOCH_URL || '',
    explorerUrl: import.meta.env.VITE_MAINNET_EXPLORER_URL || '',
  },
  devnet: {
    name: 'Devnet',
    url: import.meta.env.VITE_DEVNET_GQL_URL || '',
    network: 'testnet',
    label: 'devnet',
    epochUrl: import.meta.env.VITE_DEVNET_EPOCH_URL || '',
    explorerUrl: import.meta.env.VITE_DEVNET_EXPLORER_URL || '',
  },
};

export const DEFAULT_NETWORK_ID: NetworkId = 'mainnet';
