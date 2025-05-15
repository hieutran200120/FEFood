import api from './apiService';

// Định nghĩa các kiểu dữ liệu
export interface HomeCategory {
  id: number;
  name: string;
  image: string;
}

export interface HomeCategoryResponse {
  items: HomeCategory[];
}

// Định nghĩa tham số cho request làm Record<string, unknown>
export interface CategoryParams extends Record<string, unknown> {
  page?: number;
  pageSize?: number;
  // Thêm các tham số khác nếu cần
}

// Cập nhật hàm getCategory
export const getCategory = async (params?: CategoryParams): Promise<HomeCategoryResponse> => {
  return api.makeAuthRequest<HomeCategoryResponse>({
    url: "/Category",
    method: "GET",
    params,
  });
};

// Lấy thông tin chi tiết danh mục theo ID
export const getCategoryById = async (id: number): Promise<HomeCategory> => {
  return api.makeAuthRequest<HomeCategory>({
    url: `/Category/${id}`,
    method: "GET",
  });
};

// Thêm danh mục mới
export const addCategory = async (category: Omit<HomeCategory, 'id'>): Promise<HomeCategory> => {
  return api.makeAuthRequest<HomeCategory>({
    url: '/Category',
    method: 'POST',
    data: category,
  });
};

// Cập nhật thông tin danh mục
export const updateCategory = async (id: number, category: Partial<HomeCategory>): Promise<HomeCategory> => {
  return api.makeAuthRequest<HomeCategory>({
    url: `/Category/${id}`,
    method: 'PUT',
    data: category,
  });
};

// Xóa danh mục
export const deleteCategory = async (id: number): Promise<void> => {
  return api.makeAuthRequest<void>({
    url: `/Category/${id}`,
    method: 'DELETE',
  });
};