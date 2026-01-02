import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { CONFIG } from '@/global-config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Optional: Add token (if using auth)
 *
 axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*
*/

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.message || error?.message || 'Something went wrong!';
    console.error('Axios error:', message);
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async <T = unknown>(
  args: string | [string, AxiosRequestConfig]
): Promise<T> => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.get<T>(url, config);

    return res.data;
  } catch (error) {
    console.error('Fetcher failed:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------
const apiBase = `${CONFIG.apiBaseUrl}`;

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: `${apiBase}/api/Security/UserInfo/manage/info`,
    signIn: `${apiBase}/api/Security/Account/login`,
    signUp: '/api/auth/sign-up',
    studentsignIn: `${apiBase}/api/SEC_Account/studentLogin`,
    forgotPasswordEmail: `${apiBase}/api/SEC_Account/forgotPasswordEmail`,
    forgotPassword: `${apiBase}/api/SEC_Account/forgotPassword`,
    refreshToken: `${apiBase}/api/SEC_Account/refreshToken`,
    VerifyOTP: `${apiBase}/api/Security/Account/verifyOTP`,
    switchLogin: `${apiBase}/api/Security/Account/switchLogin`,
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
} as const;
