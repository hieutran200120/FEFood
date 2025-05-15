import api from './apiService';

// Định nghĩa các interface
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
export const postOrder = (data: OrderRequest) => {
    return api.makeAuthRequest({
        url: "/Order",
        method: "POST",
        data
    });
};

// Lấy chi tiết đơn hàng
export const getOrder = (params: OrderParams) => {
    return api.makeAuthRequest({
        url: "/Order/OrderDetail",
        method: "GET",
        params
    });
};

// Cập nhật trạng thái đơn hàng
export const changeStatus = (orderId: string | number, statusData: StatusData) => {
    return api.makeAuthRequest<{ success: boolean; message?: string }>({
        url: `/Order?Id=${orderId}`,
        method: "PUT",
        data: statusData
    });
};