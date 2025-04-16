import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/main/home/HomeScreen';
import ConfrontationScreen from '../screens/main/confrontation/ConfrontationScreen';
import TicketsScreen from '../screens/main/tickets/TicketsScreen';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
import { SvgImage } from '../components/svgImage/SvgImage';
import { normalize } from '../theme/metrics';
import { Routes } from './routes';
import { BottomTabParamList } from '../types/navigation.type';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: normalize('height', 84),
          paddingHorizontal: normalize('width', 20),
          backgroundColor: '#FFFFFF',
        },
      }}>
      <Tab.Screen
        name={Routes.home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <SvgImage
              source={require('../assets/svg/tabs/home.svg')}
              width={24}
              height={24}
              stroke={'rgba(255, 255, 255, 0.1)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.confrontation}
        component={ConfrontationScreen}
        options={{
          tabBarLabel: 'Confrontation',
          tabBarIcon: ({ focused }) => (
            <SvgImage
              source={require('../assets/svg/tabs/note.svg')}
              width={24}
              height={24}
              stroke={'rgba(255, 255, 255, 0.1)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.tickets}
        component={TicketsScreen}
        options={{
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ focused }) => (
            <SvgImage
              source={require('../assets/svg/tabs/ticket.svg')}
              width={24}
              height={24}
              stroke={'rgba(255, 255, 255, 0.1)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <SvgImage
              source={require('../assets/svg/tabs/user.svg')}
              width={24}
              height={24}
              stroke={'rgba(255, 255, 255, 0.1)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};