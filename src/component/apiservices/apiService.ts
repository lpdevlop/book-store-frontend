import axiosInstance, { CustomAxiosRequestConfig } from './axiosInstance';
import { LoginRequest, TokenResponse, UserProfile ,UserProfilePayload} from './apiTypes';

const apiService = {
  login: (data: LoginRequest) =>
    axiosInstance.post<{ data: TokenResponse }>('/auth/login', data),

  getUserProfile: (data: UserProfilePayload) =>
    axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

  getTopBooks: () =>
    axiosInstance.get('/book/top',{ skipAuth: true } as CustomAxiosRequestConfig),

};

export default apiService;
