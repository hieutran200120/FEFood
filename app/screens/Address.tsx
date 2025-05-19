import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components';
import { CartContext } from '../context/CartContext';
import { getAddress } from '../services/addressService';
import { Address, CartContextType, NavigationProp } from '../types';
interface AddressProps {
    navigation: NavigationProp;
}

const AddressScreen: React.FC<AddressProps> = ({ navigation }) => {
    const [dataAddress, setDataAddress] = useState<Address[]>([]);
    const { address, updateAddress } = useContext(CartContext) as CartContextType;

    const handleSelect = async (selectedAddress: Address) => {
        // Chỉ cập nhật địa chỉ được chọn (chuyển thành mảng)
        await updateAddress([selectedAddress]);
        navigation.navigate("order");
    };

    const fetchAddress = async () => {
        try {
            const data = await getAddress();
            setDataAddress(data);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const renderItem = ({ item }: { item: Address }) => (
        <TouchableOpacity
            className="flex-row items-center px-4 py-3 border-b border-gray-200"
            onPress={() => handleSelect(item)}
        >
            <View className="mr-3">
                <FontAwesome
                    name={address && address.length > 0 && address[0].id === item.id
                        ? "dot-circle-o"
                        : "circle-o"}
                    size={20}
                    color={address && address.length > 0 && address[0].id === item.id
                        ? "#ee4d2d"
                        : "#999"}
                />
            </View>
            <View className="flex-1">
                <Text className="font-bold text-sm">{item.receiver}</Text>
                <Text className="text-gray-600 text-sm">
                    {item.streetName}, {item.ward}, {item.district}, {item.province}
                </Text>
            </View>
            <TouchableOpacity className="ml-3">
                <Text className="text-[#ee4d2d] font-bold text-sm">Sửa</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <Header
            title="Chọn địa chỉ nhận hàng"
            containerStyle="h-15 px-4 mt-5 items-center"
            leftComponent={
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            }
            rightComponent={<View className="w-10" />}
        />
    );

    return (
        <View className="flex-1 bg-white px-2">
            {renderHeader()}
            <FlatList
                data={dataAddress}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center py-5 text-gray-500">
                        Chưa có địa chỉ nào
                    </Text>
                }
            />
            <TouchableOpacity
                className="flex-row items-center justify-center py-4"
                onPress={() => navigation.navigate("AddAddress")}
            >
                <FontAwesome name="plus-circle" size={20} color="#ee4d2d" />
                <Text className="text-[#ee4d2d] text-sm font-bold ml-2">
                    Thêm Địa Chỉ Mới
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressScreen;