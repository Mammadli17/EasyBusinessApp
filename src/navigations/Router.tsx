// src/navigation/Router.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { AuthRouter } from './Auth.Router';
import { MainRouter } from './Main.Router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../stores/auth/authStore';

const RootStack = createNativeStackNavigator();

const Router = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const { token, checkToken } = useAuthStore();


  useEffect(() => {
    checkToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>

      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <RootStack.Screen name="Main" component={MainRouter} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthRouter} />
          )}

        </RootStack.Navigator>
      </NavigationContainer>

    </View>
  );
};

export default Router;
