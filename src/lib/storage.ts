/**
 * Storage wrapper for chrome.storage.local
 */

export interface StorageArea {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: unknown): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

export const storage: StorageArea = {
  get: async <T = unknown>(key: string): Promise<T | undefined> => {
    try {
      const result = await chrome.storage.local.get([key]);
      return result[key] as T;
    } catch (error) {
      console.error(`Error getting key ${key} from storage:`, error);
      return undefined;
    }
  },

  set: async (key: string, value: unknown): Promise<void> => {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (error) {
      console.error(`Error setting key ${key} in storage:`, error);
      throw error;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await chrome.storage.local.remove(key);
    } catch (error) {
      console.error(`Error removing key ${key} from storage:`, error);
      throw error;
    }
  },

  clear: async (): Promise<void> => {
    try {
      await chrome.storage.local.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

export const sessionStorage: StorageArea = {
  get: async <T = unknown>(key: string): Promise<T | undefined> => {
    try {
      // Fallback for development environments where chrome.storage.session might not be available
      if (!chrome.storage?.session) return undefined;
      const result = await chrome.storage.session.get([key]);
      return result[key] as T;
    } catch (error) {
      console.error(`Error getting key ${key} from session storage:`, error);
      return undefined;
    }
  },

  set: async (key: string, value: unknown): Promise<void> => {
    try {
      if (!chrome.storage?.session) return;
      await chrome.storage.session.set({ [key]: value });
    } catch (error) {
      console.error(`Error setting key ${key} in session storage:`, error);
      throw error;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      if (!chrome.storage?.session) return;
      await chrome.storage.session.remove(key);
    } catch (error) {
      console.error(`Error removing key ${key} from session storage:`, error);
      throw error;
    }
  },

  clear: async (): Promise<void> => {
    try {
      if (!chrome.storage?.session) return;
      await chrome.storage.session.clear();
    } catch (error) {
      console.error('Error clearing session storage:', error);
      throw error;
    }
  },
};

export default storage;
