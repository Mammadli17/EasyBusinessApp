import React, { useEffect, useState } from 'react';
import { Routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/home/HomeScreen';
import { defaultScreenOptions } from '../configs/navigationConfig';
import { BottomTabs } from './BottomTabs';
import { RootStackParamList } from './types';

const MainStack = createNativeStackNavigator<RootStackParamList>();

export const MainRouter = () => {

    return (
        <MainStack.Navigator
                  screenOptions={defaultScreenOptions}
         >
                  <MainStack.Screen name="BottomTabs" component={BottomTabs} />
        </MainStack.Navigator>
    );
};