import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '../types';
interface OrderDetailsProps {
    navigation: NavigationProp;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ navigation }) => {
    // Sample data
    const orderStatus = {
        status: 'Đã hủy vào 8 Th06',
        statusNote: 'Đã được hủy bởi bạn',
        isCancel: true,
    };

    const deliveryInfo = {
        type: 'Nhanh',
        address: 'A Hòa(Nhận Hộ Trần Nhật Hiếu 0706204358)',
        phone: '(+84) 279 455 124',
        location: 'Quán Cafe Nhung Kute, Ngõ 53 Phạm Tuấn Tài...',
    };

    const productInfo = {
        name: 'CHÍNH HÃNG✨ Tinh chất Timeless',
        detail: '30ml',
        quantity: 1,
        originalPrice: 352000,
        discountPrice: 239000,
        totalPrice: 237880,
    };

    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="flex-row items-center p-4 bg-white">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text className="ml-4 text-lg font-medium">Thông tin đơn hàng</Text>
            </View>

            {/* Order Status */}
            <View className={`p-4 ${orderStatus.isCancel ? 'bg-green-600' : 'bg-green-600'}`}>
                <Text className="text-white text-base font-medium">{orderStatus.status}</Text>
                <Text className="text-white text-sm">{orderStatus.statusNote}</Text>
            </View>

            {/* Delivery Info */}
            <View className="mt-2 bg-white p-4">
                <Text className="text-base font-medium mb-2">Thông tin vận chuyển</Text>
                <View className="flex-row items-center mt-2">
                    <Ionicons name="flash-outline" size={20} color="#000" />
                    <Text className="ml-2">{deliveryInfo.type}</Text>
                </View>
            </View>

            {/* Address */}
            <View className="mt-2 bg-white p-4">
                <Text className="text-base font-medium mb-2">Địa chỉ nhận hàng</Text>
                <View className="flex-row mt-2">
                    <Ionicons name="location-outline" size={20} color="#000" className="mt-1" />
                    <View className="ml-2 flex-1">
                        <Text className="text-base">{deliveryInfo.address}</Text>
                        <Text className="text-sm text-gray-500">{deliveryInfo.phone}</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-sm text-gray-500">{deliveryInfo.location}</Text>
                            <TouchableOpacity>
                                <Text className="text-blue-500 text-sm">Xem thêm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Products */}
            <View className="mt-2 bg-white p-4">
                <TouchableOpacity className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-medium">Lụne cửa hàng</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>

                <View className="flex-row mt-3">
                    <Image
                        source={{ uri: 'https://via.placeholder.com/60' }}
                        className="w-16 h-16 bg-gray-200 rounded"
                    />
                    <View className="ml-3 flex-1">
                        <Text className="font-medium">{productInfo.name}</Text>
                        <Text className="text-gray-500 text-sm mt-1">{productInfo.detail}</Text>
                        <View className="flex-row justify-between items-center mt-2">
                            <Text className="text-sm">x{productInfo.quantity}</Text>
                            <View className="flex-row items-center">
                                <Text className="text-xs text-gray-500 line-through mr-1">₫{productInfo.originalPrice.toLocaleString()}</Text>
                                <Text className="text-base font-medium">₫{productInfo.discountPrice.toLocaleString()}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-4 border-t border-gray-200 pt-3">
                    <Text className="text-right font-medium">Thành tiền: ₫{productInfo.totalPrice.toLocaleString()}</Text>
                </View>
            </View>

            {/* Support Section */}
            <View className="mt-2 bg-white">
                <Text className="p-4 text-base font-medium">Bạn cần hỗ trợ?</Text>

                <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#000" />
                        <Text className="ml-3">Liên hệ Shop</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center px-4 py-3 border-t border-gray-100">
                    <View className="flex-row items-center">
                        <Ionicons name="help-circle-outline" size={20} color="#000" />
                        <Text className="ml-3">Trung tâm Hỗ trợ</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Bottom Actions */}
            <View className="mt-2 mb-6 flex-row px-2">
                <TouchableOpacity className="flex-1 border border-gray-300 rounded-md py-3 mr-2">
                    <Text className="text-center font-medium">Xem Chi tiết đơn hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-orange-500 rounded-md py-3 ml-2">
                    <Text className="text-center font-medium text-white">Mua lại</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OrderDetails;