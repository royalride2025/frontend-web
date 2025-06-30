import axios from 'axios';
import useTokenStore from '@/store';

const api = axios.create({
    // todo: move this value to env variable.
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// login admin
export const login = async (data: { identifier: string; password: string, platform: string }) =>
    api.post('/api/auth/login', data);

// register admin
export const register = async (data: { name: string; email: string; password: string }) =>
    api.post('/api/auth/register-compliance', {email: data.email, password: data.password, profile: { name: data.name }});

// forget password
export const forgetPassword = async (data: { email: string; }) =>
    api.post('/api/auth/forget-password-admin', data);

// verify otp
export const verifyOtp = async (data: { email: string; otp: string; newPassword: string, confirmPassword: string}) =>
    api.post('/api/auth/reset-password-admin', data);

interface PaginationParams {
  page?: number;
  limit?: number;
  filterStatus?: string;
}

// get all customers
export const getCustomers = async ({ page = 1, limit = 5 }: PaginationParams = {}) => {
  const response = await api.get(`/api/list/all-customers?page=${page}&limit=${limit}`);
  return response.data;
};

// get all admins and compliance
export const getAdmins = async ({ page = 1, limit = 5 }: PaginationParams = {}) => {
  const response = await api.get(`/api/list/all-admins-compliance?page=${page}&limit=${limit}`);
  return response.data;
};

// activate or deactivate user
export const updateUserStatus = async ({ userId, status }: { userId: string, status: string }) =>
  api.patch(`/api/list/user/${userId}/status`, { status });

// get all drivers
export const getDrivers = async ({ page = 1, limit = 5, filterStatus = 'accepted' }: PaginationParams = {}) => {
  const response = await api.get(`/api/list/all-drivers?page=${page}&limit=${limit}&filterStatus=${filterStatus}`);
  return response.data;
};

// accept or reject driver
export const updateDriverProfileStatus = async ({ userId, status }: { userId: string, status: string }) =>
  api.patch(`/api/list/driver/${userId}/profile_status`, { profile_status: status });

// get all vehicles
export const getVehicles = async ({ page = 1, limit = 5 }: PaginationParams = {}) => {
  const response = await api.get(`/api/list/vehicles-with-owners?page=${page}&limit=${limit}`);
  return response.data;
};

// accept or reject vehicle
export const updateVehicleStatus = async ({ id, status }: { id: string, status: string }) =>
  api.patch(`/api/list/vehicle/${id}/status`, { status: status });

export const getBooks = async () => api.get('/api/books');

export const createBook = async (data: FormData) =>
    api.post('/api/books', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
