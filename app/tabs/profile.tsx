import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants';
import { logout } from '../services/authService';
import { NavigationProp } from '../types';

// Define proper screen names that match your route configuration
type ScreenNames =
  | "ProfileScreen"
  | "Address"
  | "HelpCenterScreen"
  | "PolicyScreen"
  | "SettingsScreen"
  | "AboutScreen"
  | "sign-in";

interface ProfileProps {
  navigation: NavigationProp;
}

// Define types for menu items with correct screen type
interface MenuItem {
  title: string;
  icon: string;
  screen: ScreenNames;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  // Logout handler
  const handleLogout = async () => {
    await logout();
    navigation.navigate("sign-in");
  };
  // Gọi fetchUser nếu user chưa có
  if (!user) {
    AsyncStorage.getItem('info').then((userJson) => {
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    });
  }
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 bg-white">
        <View className="bg-primary py-8 items-center">
          <Ionicons name="person-circle" size={80} color="white" />
          <Text className="text-white text-lg font-bold mt-2">Hoang634</Text>
        </View>

        <View className="py-2">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center py-4 px-5 border-b border-gray-200"
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon as any} size={20} color={COLORS.primary} />
              <Text className="text-base ml-3">{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        className="bg-primary p-4 mx-5 rounded-lg items-center mb-5"
        onPress={handleLogout}
      >
        <Text className="text-white text-base">Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

// Ensure screen names match exactly with your route configuration
const menuItems: MenuItem[] = [
  { title: 'Hồ sơ', icon: 'person-outline', screen: 'ProfileScreen' },
  { title: 'Địa chỉ', icon: 'location-outline', screen: 'Address' },
  { title: 'Trung tâm Trợ giúp', icon: 'help-circle-outline', screen: 'HelpCenterScreen' },
  { title: 'Chính sách quy định', icon: 'document-text-outline', screen: 'PolicyScreen' },
  { title: 'Cài đặt', icon: 'settings-outline', screen: 'SettingsScreen' },
  { title: 'Về Eatme', icon: 'fast-food-outline', screen: 'AboutScreen' },
];

export default Profile;