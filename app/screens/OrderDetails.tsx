import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getOrder } from "../services/orderService";
import { BASE_URL, NavigationProp } from '../types';

interface OrderDetailsProps {
    navigation: NavigationProp;
}

interface RouteParams {
    id: string;
}

interface OrderItemType {
    id: string;
    shopName?: string;
    orderItem: {
        id: string;
        status: number;
        price: number;
        quantity: number;
        food_id: number;
    };
    orderItems: {
        name: string;
        image: string[];
    };
    order: {
        createdAt: string;
    };
    address?: {
        receiver: string;
        province: string;
        district: string;
        ward: string;
        streetName: string;
    }
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ navigation }) => {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const [orderDetail, setOrderDetail] = useState<OrderItemType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    console.log("id", id);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                const data = await getOrder({ "id": id });
                if (data.items && data.items.length > 0) {
                    setOrderDetail(data.items[0]);
                }
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const getOrderStatus = (status: number) => {
        const statusMap: Record<number, string> = {
            0: "Đã hủy",
            1: "Chờ xác nhận",
            2: "Chờ lấy hàng",
            3: "Chờ giao hàng",
            4: "Đã giao",
        };
        return statusMap[status] || "Không xác định";
    };

    const getStatusColor = (status: number) => {
        const colorMap: Record<number, string> = {
            0: "bg-red-500",
            1: "bg-orange-500",
            2: "bg-blue-500",
            3: "bg-purple-500",
            4: "bg-green-600",
        };
        return colorMap[status] || "bg-gray-500";
    };

    const getStatusNote = (status: number) => {
        const noteMap: Record<number, string> = {
            0: "Đơn hàng đã bị hủy",
            1: "Đơn hàng đang chờ xác nhận từ cửa hàng",
            2: "Đơn hàng đang chờ lấy hàng",
            3: "Đơn hàng đang được giao",
            4: "Đơn hàng đã giao thành công",
        };
        return noteMap[status] || "";
    };

    // const handleOrderAction = async () => {
    //     if (!orderDetail) return;

    //     const status = orderDetail.orderItem.status;
    //     if (status === 1 || status === 2 || status === 3) {
    //         try {
    //             await changeStatus(orderDetail.id, { status: status + 1 });
    //             // Fetch updated order details
    //             setLoading(true);
    //             const data = await getOrder({ "id": id });
    //             if (data.items && data.items.length > 0) {
    //                 setOrderDetail(data.items[0]);
    //             }
    //             setLoading(false);

    //             if (status === 3) {
    //                 navigation.navigate("Rating", { foodId: orderDetail.orderItem.food_id.toString() });
    //             }
    //         } catch (error) {
    //             console.error("Error changing status:", error);
    //         }
    //     } else if (status === 0 || status === 4) {
    //         navigation.navigate("ReorderScreen" as never);
    //     }
    // };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getDate()} Th${date.getMonth() + 1}`;
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#ff6600" />
                <Text className="mt-2">Đang tải thông tin đơn hàng...</Text>
            </View>
        );
    }

    if (!orderDetail) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Ionicons name="alert-circle-outline" size={50} color="#ff6600" />
                <Text className="mt-2 text-lg">Không tìm thấy thông tin đơn hàng</Text>
                <TouchableOpacity
                    className="mt-4 bg-orange-500 px-4 py-2 rounded-lg"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-white">Quay lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const status = orderDetail.orderItem.status;
    const statusText = getOrderStatus(status);
    const statusColor = getStatusColor(status);
    const statusNote = getStatusNote(status);
    const statusDate = orderDetail.order?.createdAt
        ? `${statusText} vào ${formatDate(orderDetail.order.createdAt)}`
        : statusText;

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
            <View className={`p-4 ${statusColor}`}>
                <Text className="text-white text-base font-medium">{statusDate}</Text>
                <Text className="text-white text-sm">{statusNote}</Text>
            </View>

            {/* Delivery Info */}
            <View className="mt-2 bg-white p-4">
                <Text className="text-base font-medium mb-2">Thông tin vận chuyển</Text>
                <View className="flex-row items-center mt-2">
                    <Ionicons name="flash-outline" size={20} color="#000" />
                    <Text className="ml-2">Giao hàng tiêu chuẩn</Text>
                </View>
                {orderDetail.order?.createdAt && (
                    <View className="flex-row items-center mt-2">
                        <Ionicons name="calendar-outline" size={20} color="#000" />
                        <Text className="ml-2">Đặt hàng: {new Date(orderDetail.order.createdAt).toLocaleDateString("vi-VN")}</Text>
                    </View>
                )}
            </View>

            {/* Address */}
            <View className="mt-2 bg-white p-4">
                <Text className="text-base font-medium mb-2">Địa chỉ nhận hàng</Text>
                <View className="flex-row mt-2">
                    <Ionicons name="location-outline" size={20} color="#000" className="mt-1" />
                    <View className="ml-2 flex-1">
                        <Text className="text-base">
                            {orderDetail.address?.receiver || "Người nhận"}
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {orderDetail.address?.streetName || ""},
                            {orderDetail.address?.ward || ""},
                            {orderDetail.address?.district || ""},
                            {orderDetail.address?.province || ""}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Products */}
            <View className="mt-2 bg-white p-4">
                <TouchableOpacity className="flex-row justify-between items-center mb-3">
                    <Text className="text-base font-medium">{orderDetail.shopName || "Cửa hàng"}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>

                <View className="flex-row mt-3">
                    <Image
                        source={{
                            uri: orderDetail.orderItems.image && orderDetail.orderItems.image.length > 0
                                ? `${BASE_URL}/Images/${orderDetail.orderItems.image[0]}`
                                : 'https://via.placeholder.com/60'
                        }}
                        className="w-16 h-16 bg-gray-200 rounded"
                    />
                    <View className="ml-3 flex-1">
                        <Text className="font-medium">{orderDetail.orderItems.name}</Text>
                        <View className="flex-row justify-between items-center mt-2">
                            <Text className="text-sm">x{orderDetail.orderItem.quantity}</Text>
                            <Text className="text-base font-medium">
                                ₫{new Intl.NumberFormat("vi-VN").format(orderDetail.orderItem.price)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="mt-4 border-t border-gray-200 pt-3">
                    <Text className="text-right font-medium">
                        Thành tiền: ₫{new Intl.NumberFormat("vi-VN").format(orderDetail.orderItem.price * orderDetail.orderItem.quantity)}
                    </Text>
                </View>
            </View>

            {/* Bottom Actions */}
            <View className="mt-2 mb-6  px-2">
                <TouchableOpacity
                    className="flex-1 border border-gray-300 rounded-md py-3 mr-2"
                    onPress={() => navigation.goBack()}
                >
                    <Text className="text-center font-medium">Quay lại</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OrderDetails;