import api from './apiService';

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
    try {
        const response = await api.get<{ items: Address[] }>('/Address');
        return response.data.items;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Tạo mới địa chỉ
export const createAddress = async (data: CreateAddressPayload): Promise<Address> => {
    try {
        const response = await api.post<Address>('/Address', data);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};
