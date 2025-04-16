import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import HomeScreen from '../screens/main/home/HomeScreen';
import ConfrontationScreen from '../screens/main/confrontation/ConfrontationScreen';
import TicketsScreen from '../screens/main/tickets/TicketsScreen';
import ProfileScreen from '../screens/main/profile/ProfileScreen';
import { TabIcon } from '../components/navigation/TabIcon';
import { Routes } from './routes';
import { BottomTabParamList } from '../types/navigation.type';
import { CommonStyles } from '../theme/common.styles';
import { TypographyStyles } from '../theme/typography';

const { width } = Dimensions.get('window');

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabIcons = {
  home: {
    filled: require('../assets/svg/tabs/home-filled.svg'),
    outline: require('../assets/svg/tabs/home.svg'),
  },
  confrontation: {
    filled: require('../assets/svg/tabs/note-filled.svg'),
    outline: require('../assets/svg/tabs/note.svg'),
  },
  tickets: {
    filled: require('../assets/svg/tabs/ticket-filled.svg'),
    outline: require('../assets/svg/tabs/ticket.svg'),
  },
  profile: {
    filled: require('../assets/svg/tabs/user-filled.svg'),
    outline: require('../assets/svg/tabs/user.svg'),
  },
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#015656',
        tabBarInactiveTintColor: '#B3B1B8',
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: [CommonStyles.alignJustifyCenter],
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tab.Screen
        name={Routes.home}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} icon={tabIcons.home} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.confrontation}
        component={ConfrontationScreen}
        options={{
          tabBarLabel: 'Confrontation',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} icon={tabIcons.confrontation} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.tickets}
        component={TicketsScreen}
        options={{
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} icon={tabIcons.tickets} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} color={color} icon={tabIcons.profile} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    position: 'absolute',
    margin: 16,
    height: 72,
    paddingHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 35 : 45,
    width: width - 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  tabBarLabel: {
    ...TypographyStyles.TinyNoneMedium,
    marginTop: 6,
    fontSize: 11,
  },
});