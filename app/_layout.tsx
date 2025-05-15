// import { Stack } from 'expo-router/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import { CartProvider } from './context/CartContext';
import './global.css';
import AddAddress from './screens/AddAddress';
import AddressScreen from './screens/Address';
import FoodDetail from './screens/FoodDetail';
import MyCart from './screens/MyCart';
import OnBoarding from './screens/OnBoarding';
import OrderDetails from './screens/OrderDetails';
import MyCard from './screens/Pay';
import ProfileScreen from './screens/Profile';
import Rating from './screens/Rating';
import Success from './screens/Success';
import TabsLayout from './tabs/_layout';
import Profile from './tabs/profile';
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CartProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'OnBoarding'}
        >
          {/* Các stack khác */}
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="sign-in" component={SignIn} />
          <Stack.Screen name="sign-up" component={SignUp} />
          <Stack.Screen name="tabs" component={TabsLayout} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="order" component={MyCard} />
          <Stack.Screen name="FoodDetail" component={FoodDetail} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Rating" component={Rating} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="AddAddress" component={AddAddress} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </CartProvider>
    </SafeAreaView>
  );
}
