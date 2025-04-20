import React, { useEffect, useState } from 'react';
import { Routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/main/home/HomeScreen';
import { defaultScreenOptions } from '../configs/navigationConfig';
import { BottomTabs } from './BottomTabs';
import { RootStackParamList } from './types';
import HomeSreenDetail from '../screens/main/home/HomeSreenDetail';
import OrdersScreen from '../screens/main/orders/OrdersScreen';
import PaymentsScreen from '../screens/main/payments/PaymentsScreen';
import NotficationsScreen from '../screens/main/notfications/NotficationsScreen';
import NotficationDetail from '../screens/main/notfications/NotficationDetail';

const MainStack = createNativeStackNavigator<RootStackParamList>();

export const MainRouter = () => {

    return (
        <MainStack.Navigator
                  screenOptions={defaultScreenOptions}
         >
                  <MainStack.Screen name="BottomTabs" component={BottomTabs} />
                  <MainStack.Screen name={Routes.detail} component={HomeSreenDetail} />
                  <MainStack.Screen name={Routes.order} component={OrdersScreen} />
                  <MainStack.Screen name={Routes.paymnet} component={PaymentsScreen} />
                  <MainStack.Screen name={Routes.notfication} component={NotficationsScreen} />
                  <MainStack.Screen name={Routes.notficationDetail} component={NotficationDetail} />



        </MainStack.Navigator>
    );
};