import axiosInstance, { CustomAxiosRequestConfig } from './axiosInstance';
import {CustomerRegistrationPayload,CustomerRegistrationResponse, AdminRegPayload, LoginRequest, TokenResponse, UserProfile ,UserProfilePayload,UserRegistrationResponse, Books} from './apiTypes';
import Topseller from '../subcomponent/topseller';

const apiService = {
  login: (data: LoginRequest) =>
    axiosInstance.post<{ data: TokenResponse }>('/auth/login', data),

  getUserProfile: (data: UserProfilePayload) =>
    axiosInstance.post<{ userprofile: UserProfile }>(`/user`,data),

  getTopBooks: () =>
    axiosInstance.get('/book/top',{ skipAuth: true } as CustomAxiosRequestConfig),

  registerAdmin: (admin:AdminRegPayload) =>
    axiosInstance.post<{adminrrregresponse:UserRegistrationResponse }>('/user/admin',admin),

  registerCutomer: (cutomer:CustomerRegistrationPayload) =>
    axiosInstance.post<{cutomerresponse:CustomerRegistrationResponse }>('/user/create',cutomer,{ skipAuth: true } as CustomAxiosRequestConfig),

  topseller: () =>
    axiosInstance.get<{topbooks:Books }>('/book/top',{ skipAuth: true } as CustomAxiosRequestConfig),

};



export default apiService;
