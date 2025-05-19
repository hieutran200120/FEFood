import api from '../services/apiService'; // Import từ file bạn đã cấu hình axios

export interface HomeFood {
  id: string;
  name: string;
  description: string;
  image: string[];
  price: number;
  isFavorite: number;
  categoryName: string;
}

export interface HomeFoodResponse {
  items: HomeFood[];
}

export interface FoodParams extends Record<string, unknown> {
  categoryId?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

// Lấy danh sách món ăn
export const getFood = async (params?: FoodParams): Promise<HomeFoodResponse> => {
  const response = await api.get<HomeFoodResponse>('api/Food', { params });
  return response.data;
};

// Lấy chi tiết món ăn theo ID
export const getFoodById = async (id: number): Promise<HomeFood> => {
  const response = await api.get<HomeFood>(`api/Food/${id}`);
  return response.data;
};

// Lấy danh sách món ăn theo danh mục
export const getFoodsByCategory = async (categoryId: number): Promise<HomeFoodResponse> => {
  return getFood({ categoryId });
};

// Thêm món ăn mới
export const addFood = async (food: Omit<HomeFood, 'id'>): Promise<HomeFood> => {
  const response = await api.post<HomeFood>('api/Food', food);
  return response.data;
};

// Cập nhật món ăn
export const updateFood = async (id: number, food: Partial<HomeFood>): Promise<HomeFood> => {
  const response = await api.put<HomeFood>(`api/Food/${id}`, food);
  return response.data;
};

// Xóa món ăn
export const deleteFood = async (id: number): Promise<void> => {
  await api.delete(`api/Food/${id}`);
};
