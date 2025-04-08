import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys, TFunctionalMethod } from '../../types/local.storage.types';

export class LanguageStorage {
  /**
   * Handles the storage of the app language.
   * @param method - "get" or "set".
   * @param data - The language code to set (e.g., "en", "ru", "az").
   * @returns The stored language if `method` is "get", or void if `method` is "set".
   */
  public static async language(
    method: TFunctionalMethod,
    data?: string,
  ): Promise<string | null | void> {
    try {
      if (method === 'get') {
        const language = await AsyncStorage.getItem(StorageKeys.language);
        return language ?? null;
      }

      if (method === 'set' && data) {
        await AsyncStorage.setItem(StorageKeys.language, data);
        return;
      }

      if (method === 'set' && !data) {
        throw new Error(
          'Language data must be provided when using the "set" method.',
        );
      }
    } catch (error) {
      console.error('Failed to handle language storage:', error);
      throw error;
    }
  }
}