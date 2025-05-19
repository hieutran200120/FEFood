import api from '../services/apiService';

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

interface OrderParams extends Record<string, unknown> {
    userId?: string | number;
}

interface StatusData {
    status: number;
}

// Tạo đơn hàng mới
export const postOrder = async (data: OrderRequest) => {
    const response = await api.post('api/Order', data);
    return response.data;
};

// Lấy chi tiết đơn hàng
export const getOrder = async (params: OrderParams) => {
    const response = await api.get('api/Order/OrderDetail', { params });
    return response.data;
};

// Cập nhật trạng thái đơn hàng
export const changeStatus = async (
    orderId: string | number,
    statusData: StatusData
) => {
    const response = await api.put<{ success: boolean; message?: string }>(
        `api/Order?Id=${orderId}`,
        statusData
    );
    return response.data;
};
