import api from '../services/apiService'; // Import từ file bạn đã cấu hình axios

export interface HomeCategory {
  id: number;
  name: string;
  image: string;
}

export interface HomeCategoryResponse {
  items: HomeCategory[];
}

export interface CategoryParams extends Record<string, unknown> {
  page?: number;
  pageSize?: number;
}

// Lấy danh sách danh mục
export const getCategory = async (
  params?: CategoryParams
): Promise<HomeCategoryResponse> => {
  const response = await api.get<HomeCategoryResponse>('api/Category', { params });
  console.log(response.data);
  return response.data;
};

// Lấy thông tin chi tiết danh mục theo ID
export const getCategoryById = async (id: number): Promise<HomeCategory> => {
  const response = await api.get<HomeCategory>(`api/Category/${id}`);
  return response.data;
};

// Thêm danh mục mới
export const addCategory = async (
  category: Omit<HomeCategory, 'id'>
): Promise<HomeCategory> => {
  const response = await api.post<HomeCategory>('api/Category', category);
  return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (
  id: number,
  category: Partial<HomeCategory>
): Promise<HomeCategory> => {
  const response = await api.put<HomeCategory>(`api/Category/${id}`, category);
  return response.data;
};

// Xóa danh mục
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`api/Category/${id}`);
};
