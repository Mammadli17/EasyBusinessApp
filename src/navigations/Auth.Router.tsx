import React, { useEffect, useState } from 'react';
import { Routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/login/LoginScreen';
import { defaultScreenOptions } from '../configs/navigationConfig';
import { RootStackParamList } from '../types/navigation.type';
import LanguageScreen from '../screens/auth/language/LanguageScreen';
import OnboardingScreen from '../screens/auth/onboarding/OnboardingScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/forgot/ForgotPasswordScreen';
import ReserPasswordScreen from '../screens/auth/reset/ResetPasswordScreen';
import LoginAsanScreen from '../screens/auth/login/LoginAsanScreen';
import LoginEmailScreen from '../screens/auth/login/LoginEmailScreen';
import WaitScreen from '../screens/auth/waiting/WaitScreen';
import OtpScreen from '../screens/auth/otp/OtpScreen';





const AuthStack = createNativeStackNavigator<RootStackParamList>();

export const AuthRouter = () => {

    return (
        <AuthStack.Navigator
            screenOptions={{
                ...defaultScreenOptions,
                animation: 'fade_from_bottom'
              }}
        >
            <AuthStack.Screen name={Routes.language} component={LanguageScreen} />
            <AuthStack.Screen name={Routes.register} component={RegisterScreen} />
            <AuthStack.Screen name={Routes.login} component={LoginScreen} />
            <AuthStack.Screen name={Routes.onboarding} component={OnboardingScreen} />
            <AuthStack.Screen name={Routes.forgot} component={ForgotPasswordScreen} />
            <AuthStack.Screen name={Routes.otp} component={OtpScreen} />
            <AuthStack.Screen name={Routes.reset} component={ReserPasswordScreen} />
            <AuthStack.Screen name={Routes.loginasan} component={LoginAsanScreen} />
            <AuthStack.Screen name={Routes.loginemail} component={LoginEmailScreen} />
            <AuthStack.Screen name={Routes.waiting} component={WaitScreen} />


        </AuthStack.Navigator>
    );
};
