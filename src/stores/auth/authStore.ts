// src/store/authStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
  checkToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,

  setToken: async (token) => {
    await AsyncStorage.setItem('token', token);
    set({ token });
  },

  removeToken: async () => {
    await AsyncStorage.removeItem('token');
    set({ token: null });
  },

  checkToken: async () => {
    const token = await AsyncStorage.getItem('token');
    set({ token });
  },
}));
