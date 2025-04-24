import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  AppState,
  LogBox,
  StatusBar,
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Router from './src/navigations/Router';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAndroidNotificationPermission();
    }

    // Request user permission and get token
    requestUserPermissionAndToken();

    // Handle background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('📦 Background message received:', JSON.stringify(remoteMessage));
    });

    // Handle initial notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🟡 Initial notification:', remoteMessage);
        }
      });

    // Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('🟢 Foreground notification:', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const requestAndroidNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('🚫 Android notification permission denied');
      }
    } catch (err) {
      console.warn('❌ Error requesting Android notification permission:', err);
    }
  };

  const requestUserPermissionAndToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('🔐 Notification permission status:', enabled);

    if (enabled) {
      try {
        const token = await messaging().getToken();
        if (token) {
          console.log('✅ Firebase token:', token);
          await AsyncStorage.setItem('FirebaseToken', token);
        } else {
          console.warn('⚠️ Token boş gəldi');
        }
      } catch (error: any) {
        console.log('❌ Token alma zamanı xəta:', error?.message || error);
      }
    } else {
      console.warn('❗İstifadəçi icazə vermədi, token alınmayacaq.');
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default gestureHandlerRootHOC(App);
