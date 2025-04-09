import React, { useEffect, useState } from 'react';
import { Routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import { defaultScreenOptions } from '../configs/navigationConfig';
import { RootStackParamList } from '../types/navigation.type';
import LanguageScreen from '../screens/auth/language/LanguageScreen';
import OnboardingScreen from '../screens/auth/onboarding/OnboardingScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';





const AuthStack = createNativeStackNavigator<RootStackParamList>();

export const AuthRouter = () => {

    return (
        <AuthStack.Navigator
            screenOptions={defaultScreenOptions}

        >
            <AuthStack.Screen name={Routes.register} component={RegisterScreen} />

            <AuthStack.Screen name={Routes.language} component={LanguageScreen} />
            <AuthStack.Screen name={Routes.login} component={LoginScreen} />
            <AuthStack.Screen name={Routes.onboarding} component={OnboardingScreen} />

        </AuthStack.Navigator>
    );
};
