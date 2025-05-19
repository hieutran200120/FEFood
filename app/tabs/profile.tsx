import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // Logout handler with confirmation dialog
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // Perform actual logout
  const confirmLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "sign-in" }]
      });
    } catch (error) {
      console.error('Error logging out:', error);
      setShowLogoutModal(false);
      // You could add another alert here for error notification
    }
  };

  // Gọi fetchUser nếu user chưa có
  useEffect(() => {
    // Sử dụng useEffect để load thông tin người dùng khi component mount
    const loadUserInfo = async () => {
      try {
        const userJson = await AsyncStorage.getItem('info');
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []);
  const displayName = () => {
    if (!user) return "Người dùng";
    return user.userName || user.username || "Người dùng";
  };
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 bg-white">
        <View className="bg-orange-500 py-8 items-center">
          <Ionicons name="person-circle" size={80} color="white" />
          <Text className="text-white text-lg font-bold mt-2">{displayName()}</Text>
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
        className="bg-orange-500 p-4 mx-5 rounded-lg items-center mb-5"
        onPress={handleLogout}
      >
        <Text className="text-white text-base">Đăng xuất</Text>
      </TouchableOpacity>
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center bg-black " style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View className="bg-white w-80 rounded-lg overflow-hidden">
            {/* Modal Content */}
            <View className="px-5 py-5">
              <Text className="text-center text-base">
                Bạn chắc chắn muốn đăng xuất?
              </Text>
            </View>

            {/* Modal Buttons */}
            <View className="flex-row border-t border-gray-200">
              <TouchableOpacity
                className="flex-1 py-3 border-r border-gray-200"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-center text-base">Không</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3"
                onPress={confirmLogout}
              >
                <Text className="text-center text-base text-red-500">Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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