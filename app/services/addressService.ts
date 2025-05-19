import api from '../services/apiService'; // Import từ file bạn đã cấu hình axios

// Kiểu dữ liệu khi tạo mới địa chỉ
export interface CreateAddressPayload {
    receiver: string;
    province: string;
    district: string;
    ward: string;
    streetName: string;
}

export interface Address extends CreateAddressPayload {
    id: string;
}

// Lấy danh sách tất cả địa chỉ
export const getAddress = async (): Promise<Address[]> => {
    const response = await api.get<{ items: Address[] }>('api/Address');
    return response.data.items;
};

// Tạo mới địa chỉ
export const createAddress = async (
    data: CreateAddressPayload
): Promise<Address> => {
    const response = await api.post<Address>('api/Address', data);
    return response.data;
};
