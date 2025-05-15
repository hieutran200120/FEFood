import api from './apiService';

// Type definitions
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
export const postRating = (data: RatingData): Promise<ApiResponse<RatingItem>> => {
    return api.makeAuthRequest({
        url: "/Rating",
        method: "POST",
        data,
    });
};
export const getRating = (params: RatingParams): Promise<ApiResponse<RatingItem>> => {
    return api.makeAuthRequest({
        url: "/Rating",
        method: "GET",
        params
    });
};