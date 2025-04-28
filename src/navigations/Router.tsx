import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { defaultScreenOptions } from '../configs/navigationConfig';
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={defaultScreenOptions}
        >
          <RootStack.Screen name="Auth" component={AuthRouter} />
          <RootStack.Screen name="Main" component={MainRouter} />
        </RootStack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Router;