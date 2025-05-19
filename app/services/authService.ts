import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/apiService';

export interface LoginResponse {
  token: string;
  id: string;
  userName: string;
  email: string;
  password: string | null;
  phoneNumber: string;
  avatar: string;
  [key: string]: any;
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

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('api/User/login', { email, password });
    const { token, id, userName, email: userEmail, password: userPassword, phoneNumber, avatar } = response.data;

    if (token) {
      await AsyncStorage.setItem('authToken', token);
    }
    await AsyncStorage.setItem('user', id.toString());
    await AsyncStorage.setItem('info', JSON.stringify({
      user_id: id,
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
    const response = await api.post('api/User', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Lỗi khi đăng ký:', apiError.response?.data || apiError.message);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('authToken');
};

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await api.post<RefreshTokenResponse>('api/User/refresh-token');
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

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(['authToken', 'info', 'user']);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
