import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components';
import icons from '../constants/icons';
import { BASE_URL, NavigationProp } from '../types';

interface ProfileProps {
    navigation: NavigationProp;
}

const ProfileScreen: React.FC<ProfileProps> = ({ navigation }) => {
    const [user, setUser] = useState<any>(null);

    // Gọi fetchUser nếu user chưa có
    if (!user) {
        AsyncStorage.getItem('info').then((userJson) => {
            if (userJson) {
                setUser(JSON.parse(userJson));
            }
        });
    }

    const renderHeader = () => (
        <Header
            title="Chi tiết"
            containerStyle="h-15 px-4 mt-5 items-center"
            leftComponent={
                <View className="flex justify-center items-center">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-md border border-gray-200 flex items-center justify-center"
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={icons.back} className="w-5 h-5" />
                    </TouchableOpacity>
                </View>
            }
        />
    );

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-white">
            {renderHeader()}
            <View className="items-center mt-4">
                <Image
                    source={{ uri: `${BASE_URL}/images/${user.avatar}` }}
                    className="w-20 h-20 rounded-full bg-gray-300"
                />
            </View>
            <View className="mt-4 border-t border-gray-200">
                {renderRow('Tên', user.userName)}
                {renderRow('Tên đăng nhập', user.email.split('@')[0])}
                {renderRow('Email', user.email)}
                {renderRow('Số điện thoại', maskPhone(user.phoneNumber))}
            </View>
        </ScrollView>
    );
};

const renderRow = (label: string, value: string) => (
    <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Text className="text-gray-600">{label}</Text>
        <Text className="text-gray-800">{value || 'No Data'}</Text>
    </View>
);

const maskPhone = (phone: string) =>
    phone ? phone.slice(0, phone.length - 2).replace(/\d/g, '*') + phone.slice(-2) : 'No Data';

const maskEmail = (email: string) => {
    const [name, domain] = email.split('@');
    return name.slice(0, 2) + '*'.repeat(name.length - 2) + '@' + domain;
};

export default ProfileScreen;
