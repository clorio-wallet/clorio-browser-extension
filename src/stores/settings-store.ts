import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NetworkId, DEFAULT_NETWORK_ID } from '@/lib/networks';

interface SettingsState {
  networkId: NetworkId;
  setNetworkId: (id: NetworkId) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      networkId: DEFAULT_NETWORK_ID,
      setNetworkId: (id) => set({ networkId: id }),
    }),
    {
      name: 'clorio_settings',
    }
  )
);
