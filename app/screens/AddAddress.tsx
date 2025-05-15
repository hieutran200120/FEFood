import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { FormInput, Header } from '../components';
import { createAddress } from '../services/addressService';
import { NavigationProp } from '../types';
interface AddAddressProps {
    navigation: NavigationProp;
}
type Province = { id: string; full_name: string };
type District = { id: string; full_name: string };
type Ward = { id: string; full_name: string };
type CreateAddressPayload = {
    receiver: string;
    province: string;
    district: string;
    ward: string;
    streetName: string;
};
const AddAddress: React.FC<AddAddressProps> = ({ navigation }) => {

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

    const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
    const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
    const [showWardDropdown, setShowWardDropdown] = useState(false);

    const [streetName, setStreetName] = useState('');
    const [receiverName, setReceiverName] = useState('');

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0 && data.data) setProvinces(data.data);
            })
            .catch((error) => console.error('Lỗi tải tỉnh/thành:', error));
    }, []);

    const fetchDistricts = (province: Province) => {
        if (!province?.id) return;
        setSelectedProvince(province);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setWards([]);

        fetch(`https://esgoo.net/api-tinhthanh/2/${province.id}.htm`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error === 0 && data.data) setDistricts(data.data);
            })
            .catch((err) => console.error('Lỗi tải quận/huyện:', err));
    };

    const fetchWards = (district: District) => {
        if (!district?.id) return;
        setSelectedDistrict(district);
        setSelectedWard(null);

        fetch(`https://esgoo.net/api-tinhthanh/3/${district.id}.htm`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error === 0 && data.data) setWards(data.data);
            })
            .catch((err) => console.error('Lỗi tải phường/xã:', err));
    };

    const handleSave = async () => {
        if (
            !receiverName ||
            !selectedProvince?.full_name ||
            !selectedDistrict?.full_name ||
            !selectedWard?.full_name ||
            !streetName
        ) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const payload: CreateAddressPayload = {
            receiver: receiverName,
            province: selectedProvince.full_name,
            district: selectedDistrict.full_name,
            ward: selectedWard.full_name,
            streetName: streetName,
        };

        try {
            const response = await createAddress(payload);
            if (response) {
                console.log("Lưu thành công!");
                navigation.navigate("Address");
            } else {
                console.log("Lỗi khi lưu địa chỉ.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const renderDropdown = (
        label: string,
        data: { id: string; full_name: string }[],
        selected: any,
        setSelected: (item: any) => void,
        show: boolean,
        setShow: (show: boolean) => void,
        onSelect: (item: any) => void
    ) => (
        <View className="mb-4">
            <TouchableOpacity
                className="flex-row justify-between items-center bg-gray-100 p-3 rounded border border-gray-300"
                onPress={() => setShow(!show)}
            >
                <Text className={`text-base ${selected ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
                    {selected ? selected.full_name : label}
                </Text>
                <Ionicons name={show ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
            </TouchableOpacity>
            {show && (
                <View className="bg-gray-100 max-h-52 border border-gray-300 rounded mt-2">
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="p-3 border-b border-gray-200"
                                onPress={() => {
                                    onSelect(item);
                                    setShow(false);
                                }}
                            >
                                <Text className="text-base text-gray-700">{item.full_name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );

    return (
        <View className="flex-1 bg-white p-5">
            <Header title="Thêm địa chỉ nhận hàng" />

            <FormInput
                label="Người nhận"
                placeholder="Nhập tên người nhận"
                onChange={(value) => setReceiverName(value)}
                containerStyle={{ marginBottom: 16 }}
                inputStyle={{ fontSize: 16, color: '#4B5563' }}
            />

            <Text className="text-lg font-semibold text-gray-500 mb-2">Khu vực được chọn</Text>

            {renderDropdown('Chọn Tỉnh Thành', provinces, selectedProvince, setSelectedProvince, showProvinceDropdown, setShowProvinceDropdown, fetchDistricts)}

            {selectedProvince &&
                renderDropdown('Chọn Quận Huyện', districts, selectedDistrict, setSelectedDistrict, showDistrictDropdown, setShowDistrictDropdown, fetchWards)}

            {selectedDistrict &&
                renderDropdown(
                    'Chọn Phường Xã',
                    wards,
                    selectedWard,
                    setSelectedWard,
                    showWardDropdown,
                    setShowWardDropdown,
                    (item) => setSelectedWard(item)
                )}

            {selectedWard && (
                <FormInput
                    label="Tên đường"
                    placeholder="Nhập tên đường"
                    value={streetName}
                    onChange={(value) => setStreetName(value)}
                    containerStyle={{ marginBottom: 16 }} // thay cho "mb-4"
                    inputStyle={{ fontSize: 16, color: '#4B5563' }} // thay cho "text-base text-gray-700"
                />
            )}

            <TouchableOpacity
                className="bg-red-500 p-4 rounded items-center mt-6"
                onPress={handleSave}
            >
                <Text className="text-white text-base font-medium">Lưu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddAddress;
