import React from 'react';
import { Image, Text, View } from 'react-native';
import { TextButton } from '../components';
import images from '../constants/images';
import { NavigationProp } from '../types';

interface SuccessProps {
    navigation: NavigationProp;
}

const Success: React.FC<SuccessProps> = ({ navigation }) => {
    return (
        <View className="flex-1 bg-white px-4">
            <View className="flex-1 justify-center items-center">
                <Image
                    source={images.success}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                />
                <Text className="text-xl font-bold mt-4">Chúc mừng!</Text>
                <Text className="text-center text-gray-500 mt-2 text-base">
                    Thanh toán của bạn đã được thực hiện thành công!
                </Text>
            </View>

            <TextButton
                label="Quay về trang chủ"
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: 16,
                    borderRadius: 8,
                    backgroundColor: '#ee4d2d',
                }}
                onPress={() => navigation.navigate('tabs')}
            />
        </View>
    );
};

export default Success;
