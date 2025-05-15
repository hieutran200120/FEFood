import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { COLORS } from '../constants';
import Home from '../tabs/home';
import Order from '../tabs/order';
import Profile from '../tabs/profile';
// Định nghĩa type cho tab navigator
export type BottomTabParamList = {
  Home: undefined;
  LocalMall: undefined;
  Favorite: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabLayout: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
          display: 'flex',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="home-sharp" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="LocalMall"
        component={Order}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="receipt" color={color} size={28} />
          ),
        }}
      />
      {/* <Tab.Screen
          name="Favorite"
          component={Home}
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <Ionicons name="heart-sharp" color={color} size={28} />
            ),
          }}
        /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabLayout;
