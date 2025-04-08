import React, { useEffect, useState } from 'react';
import { Routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/home/HomeScreen';
import { RootStackParamList } from '../types/navigation.type';
import { defaultScreenOptions } from '../configs/navigationConfig';





const MainStack = createNativeStackNavigator<RootStackParamList>();

export const MainRouter = () => {

    return (
        <MainStack.Navigator
                  screenOptions={defaultScreenOptions}
        
         >
            <MainStack.Screen name={Routes.home} component={HomeScreen} />
        </MainStack.Navigator>
    );
};
