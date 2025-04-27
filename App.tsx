import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import Router from './src/navigations/Router';

const App = () => {
  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('🚫 Android bildiriş icazəsi rədd edildi.');
        }
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      console.log('🔐 Notification permission status:', enabled);

      if (enabled) {
        const token = await messaging().getToken();
        if (token) {
          console.log('✅ Firebase Token:', token);
          await AsyncStorage.setItem('FirebaseToken', token);
        } else {
          console.warn('⚠️ Token boş gəldi');
        }
      }

      const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
        console.log('🟢 Foreground bildirişi:', remoteMessage);
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('📦 Background bildirişi:', remoteMessage);
      });

      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('🟡 App açılarkən bildiriş:', initialNotification);
      }

      return () => {
        unsubscribeOnMessage();
      };

    } catch (error: any) {
      console.error('❌ Notification setup zamanı xəta:', error?.message || error);
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
