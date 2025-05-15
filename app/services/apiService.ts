import axios, { AxiosError, AxiosInstance, AxiosResponse, HeadersDefaults, InternalAxiosRequestConfig } from 'axios';
import { getToken, logout, refreshToken } from './authService';

// Sử dụng hằng số cho API_BASE_URL để dễ quản lý
const API_BASE_URL = 'http://192.168.9.110:45455/api';

interface RefreshQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

export interface MakeAuthRequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, unknown>;
}

interface CustomAxiosInstance extends Omit<AxiosInstance, 'defaults'> {
  makeAuthRequest: <T = any>(params: MakeAuthRequestParams) => Promise<T>;
  defaults: {
    headers: HeadersDefaults & {
      common: Record<string, string>;
    };
  };
}

// Tạo instance Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Tăng thời gian timeout để xử lý mạng chậm
}) as unknown as CustomAxiosInstance;

// Xử lý request interceptor - thêm token vào header
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Biến kiểm soát refresh token
let isRefreshing = false;
let refreshQueue: RefreshQueueItem[] = [];

// Xử lý refresh token khi gặp lỗi 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Nếu lỗi 401 & request chưa được retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise<string>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        })
          .then((newToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            }
            return api.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        // Cập nhật token trong headers mặc định
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }

        // Xử lý các request trong hàng đợi
        refreshQueue.forEach((p) => p.resolve(newToken));
        refreshQueue = [];

        // Thực thi lại request ban đầu với token mới
        return api.request(originalRequest);
      } catch (refreshError) {
        // Thông báo lỗi cho tất cả các request trong hàng đợi
        refreshQueue.forEach((p) => p.reject(refreshError));
        refreshQueue = [];

        // Đăng xuất người dùng khi không thể refresh token
        await logout();
        if (typeof window !== 'undefined') {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Hàm chung gọi API với các phương thức khác nhau
api.makeAuthRequest = async <T = any>({ 
  url, 
  method = 'GET', 
  data = null, 
  params = {} 
}: MakeAuthRequestParams): Promise<T> => {
  try {
    // Sử dụng api instance thay vì axios
    const response = await api.request<any, AxiosResponse<T>>({
      url,
      method,
      ...(data ? { data } : {}),
      ...(Object.keys(params).length ? { params } : {}),
    });
    return response.data;
  } catch (error) {
    console.error(`Error with ${method} request to ${url}:`, error);
    throw error;
  }
};

export default api;