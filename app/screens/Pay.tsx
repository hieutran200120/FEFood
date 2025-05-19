import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goBack } from "expo-router/build/global-state/routing";
import React, { useContext, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FooterTotal, Header } from '../components';
import { CartContext } from '../context/CartContext';
import { postOrder } from '../services/orderService';
import { Address, BASE_URL, CartContextType } from '../types';

// Định nghĩa các interface
interface MyCardProps {
    navigation: any;
}



interface CartItem {
    id: number | string;
    name: string;
    price: number;
    quantity: number;
    image: string[];
}

interface OrderRequest {
    order: {
        price: number;
        note: string;
        payment: string;
        user_id: string;
        address_id?: number | string;
    };
    orderItems: {
        price: number;
        quantity: number;
        food_id: number | string;
        status: number;
    }[];
}

const MyCard: React.FC<MyCardProps> = ({ navigation }) => {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<number>(0);
    const [note, setNote] = useState<string>('');
    const { cartItems, deleteCartItem, totalPrice, increaseQuantity, decreaseQuantity, address, clearCart } = useContext(CartContext) as CartContextType;

    const getUserId = async (): Promise<string | null> => {
        return await AsyncStorage.getItem('user');
    };

    function renderHeard() {
        return (
            <Header
                title="Thanh toán"
                containerStyle="h-15 px-4 mt-5 items-center"
                leftComponent={
                    <Ionicons name="arrow-back" size={24} color="#000" onPress={goBack} />
                }
                rightComponent={
                    <View className="w-10"></View>
                }
            />
        );
    }

    const submitOrder = async () => {
        console.log("onclick")
        const userId = await getUserId();
        console.log(userId)
        if (!userId || !address) return;
        try {
            const orderData: OrderRequest = {
                order: {
                    price: Number(totalPrice),
                    note: note,
                    payment: selectedPayment.toString(),
                    user_id: userId,
                    address_id: address[0]?.id,
                },
                orderItems: cartItems.map(item => ({
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                    food_id: item.id,
                    status: 1,
                }))
            };

            const response = await postOrder(orderData);
            clearCart();
            navigation.navigate("Success");
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    return (
        <View className="flex-1 bg-white">
            {renderHeard()}
            <View className="flex-1 bg-white">
                <ScrollView className="p-5">
                    <TouchableOpacity
                        className="flex-row items-center p-2.5 bg-gray-100 rounded mb-2.5"
                        onPress={() => navigation.navigate("Address")}
                    >
                        <FontAwesome name="map-marker" size={30} color="#ee4d2d" />
                        <View className="flex-1 ml-2.5">
                            {Array.isArray(address) ? (
                                address.length > 0 ? (
                                    <>
                                        <Text className="font-bold text-base">{address[0]?.receiver}</Text>
                                        <Text className="text-gray-600">
                                            {address[0]?.streetName},{address[0]?.province},{address[0]?.district},{address[0]?.ward}
                                        </Text>
                                    </>
                                ) : (
                                    <Text className="font-bold text-base">Chưa có địa chỉ</Text>
                                )
                            ) : (
                                <>
                                    <Text className="font-bold text-base">{(address as Address)?.receiver}</Text>
                                    <Text className="text-gray-600">
                                        {(address as Address)?.streetName},{(address as Address)?.province},
                                        {(address as Address)?.district},{(address as Address)?.ward}
                                    </Text>
                                </>
                            )}
                        </View>
                        <FontAwesome name="chevron-right" size={20} color="#999" />
                    </TouchableOpacity>

                    {cartItems.map((product) => (
                        <View key={product.id.toString()} className="p-2.5 bg-white rounded mb-2.5">
                            <Text className="bg-[#ee4d2d] text-white p-0.5 rounded text-xs self-start">Yêu thích</Text>
                            <Text className="font-bold mt-1.5">Chuyen_si.vn</Text>
                            <View className="flex-row mt-2.5">
                                <Image
                                    source={{ uri: `${BASE_URL}/Images/${product.image?.[0].toString()}` }}
                                    className="w-12 h-12 rounded"
                                />
                                <View className="ml-2.5 flex-1">
                                    <Text className="font-bold">{product.name}</Text>
                                    <View className="flex-row items-center">
                                        <Text className="font-bold text-[#ee4d2d] mr-1.5">
                                            {new Intl.NumberFormat("vi-VN").format(Number(product.price)) + "₫"}
                                        </Text>
                                        <Text className="text-gray-600">x{product.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View>
                        <Text className="text-sm text-gray-800 mb-1">
                            Ghi chú:
                        </Text>
                        <TextInput
                            value={note}
                            onChangeText={setNote}
                            placeholder="Thêm ghi chú..."
                            placeholderTextColor="#999"
                            className="border border-gray-300 p-2 rounded h-10 bg-white mb-5 text-sm"
                        />
                    </View>

                    <View className="flex-row justify-between mb-2.5">
                        <TouchableOpacity
                            className={`flex-1 p-2.5 border rounded items-center mx-1.5 ${selectedPayment === 1 ? 'border-[#ee4d2d]' : 'border-gray-300'}`}
                            onPress={() => setSelectedPayment(1)}>
                            <Text className={`${selectedPayment === 1 ? 'text-[#ee4d2d]' : 'text-gray-800'}`}>VnPay</Text>
                            {selectedPayment === 1 && (
                                <View className="absolute top-0 right-0 bg-[#ee4d2d] p-0.5 rounded-tr rounded-bl">
                                    <Text className="text-white text-xs font-bold">✔</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`flex-1 p-2.5 border rounded items-center mx-1.5 ${selectedPayment === 0 ? 'border-[#ee4d2d]' : 'border-gray-300'}`}
                            onPress={() => setSelectedPayment(0)}>
                            <Text className={`${selectedPayment === 0 ? 'text-[#ee4d2d]' : 'text-gray-800'}`}>Tiền mặt</Text>
                            {selectedPayment === 0 && (
                                <View className="absolute top-0 right-0 bg-[#ee4d2d] p-0.5 rounded-tr rounded-bl">
                                    <Text className="text-white text-xs font-bold">✔</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <FooterTotal
                    subTotal={Number(totalPrice) || 0}
                    shippingFee={0}
                    total={Number(totalPrice) || 0}
                    onPress={() => {
                        submitOrder();
                    }}
                />
            </View>
        </View>
    );
};

export default MyCard;