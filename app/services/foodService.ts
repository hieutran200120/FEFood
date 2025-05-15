import api from './apiService';

// Định nghĩa các kiểu dữ liệu
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

// Định nghĩa tham số cho request làm Record<string, unknown>
export interface FoodParams extends Record<string, unknown> {
  categoryId?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

// Cập nhật hàm getFood
export const getFood = async (params?: FoodParams): Promise<HomeFoodResponse> => {
  return api.makeAuthRequest<HomeFoodResponse>({
    url: "/Food",
    method: "GET",
    params,
  });
};

// Lấy thông tin chi tiết của món ăn theo ID
export const getFoodById = async (id: number): Promise<HomeFood> => {
  return api.makeAuthRequest<HomeFood>({
    url: `/Food/${id}`,
    method: "GET",
  });
};

// Lấy danh sách món ăn theo danh mục
export const getFoodsByCategory = async (categoryId: number): Promise<HomeFoodResponse> => {
  const params: FoodParams = { categoryId };
  return getFood(params);
};

// Thêm món ăn mới
export const addFood = async (food: Omit<HomeFood, 'id'>): Promise<HomeFood> => {
  return api.makeAuthRequest<HomeFood>({
    url: '/Food',
    method: 'POST',
    data: food,
  });
};

// Cập nhật thông tin món ăn
export const updateFood = async (id: number, food: Partial<HomeFood>): Promise<HomeFood> => {
  return api.makeAuthRequest<HomeFood>({
    url: `/Food/${id}`,
    method: 'PUT',
    data: food,
  });
};

// Xóa món ăn
export const deleteFood = async (id: number): Promise<void> => {
  return api.makeAuthRequest<void>({
    url: `/Food/${id}`,
    method: 'DELETE',
  });
};