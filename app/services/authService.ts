import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.9.110:45455/api';
//const API_BASE_URL = 'http://192.168.10.161:45456/api'

interface LoginResponse {
  token: string;
  id: string;
  userName: string;
  email: string;
  password: string | null;
  phoneNumber: string;
  avatar: string;
  [key: string]: any;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenResponse {
  token: string;
}

interface ApiError {
  response?: {
    data?: any;
  };
  message?: string;
}

// Hàm đăng nhập và lưu token
export const login = async (email: string, password: string): Promise<LoginResponse> => {

  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/User/login`, { email, password });
    const { token, id: user_id, userName,
      email: userEmail,
      password: userPassword,
      phoneNumber,
      avatar, } = response.data;

    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }
    await AsyncStorage.setItem('info', JSON.stringify({
      user_id,
      userName,
      email: userEmail,
      password: userPassword,
      phoneNumber,
      avatar,
    }));
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/User`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    console.error("Lỗi khi đăng ký:", apiError.response?.data || apiError.message);
    throw error;
  }
};

// Hàm lấy token từ AsyncStorage
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('authToken');
};

// Hàm refresh token
export const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(`${API_BASE_URL}/User/refresh-token`);
    const { token } = response.data;

    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }

    return token;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

// Hàm đăng xuất (xoá token)
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('info');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}; 