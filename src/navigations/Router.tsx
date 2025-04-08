import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { MainRouter } from './Main.Router';
import { AuthRouter } from './Auth.Router';
import { defaultScreenOptions } from '../configs/navigationConfig';


const RootStack = createNativeStackNavigator();

const Router = () => {


  return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={defaultScreenOptions}
        >
          <RootStack.Screen name="Auth" component={AuthRouter} />
          <RootStack.Screen name="Main" component={MainRouter} />
        </RootStack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Router;
