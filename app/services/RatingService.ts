import api from '../services/apiService';

interface RatingData {
    food_id: string;
    user_id: string;
    star: number;
    comment: string;
}

interface RatingParams {
    food_id?: string;
    user_id?: string;
    [key: string]: unknown;
}

interface ApiResponse<T> {
    items: T[];
    success: boolean;
    message?: string;
    statusCode: number;
}

interface RatingItem {
    id: string;
    food_id: string;
    user_id: string;
    star: number;
    comment: string;
    date: string;
    user: {
        id: string;
        userName: string;
        avatar?: string;
    };
}

// Gửi đánh giá món ăn
export const postRating = async (
    data: RatingData
): Promise<ApiResponse<RatingItem>> => {
    const response = await api.post<ApiResponse<RatingItem>>('api/Rating', data);
    return response.data;
};

// Lấy danh sách đánh giá
export const getRating = async (
    params: RatingParams
): Promise<ApiResponse<RatingItem>> => {
    const response = await api.get<ApiResponse<RatingItem>>('api/Rating', { params });
    return response.data;
};
