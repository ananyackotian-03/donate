import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// AUTH API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyEmail: (token) => apiClient.get(`/auth/verify/${token}`),
  getProfile: () => apiClient.get('/auth/profile'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => apiClient.post(`/auth/reset-password/${token}`, { password })
};

// DONATION API
export const donationAPI = {
  createDonation: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return apiClient.post('/donations', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getAllDonations: (params = {}) => apiClient.get('/donations', { params }),
  getDonationById: (id) => apiClient.get(`/donations/${id}`),
  getMyDonations: () => apiClient.get('/donations/my-donations'),
  updateDonation: (id, data) => apiClient.put(`/donations/${id}`, data),
  deleteDonation: (id) => apiClient.delete(`/donations/${id}`)
};

// ORGANIZATION API
export const organizationAPI = {
  createOrganization: (data) => apiClient.post('/organizations', data),
  getAllOrganizations: (params = {}) => apiClient.get('/organizations', { params }),
  getOrganizationById: (id) => apiClient.get(`/organizations/${id}`),
  getMyOrganization: () => apiClient.get('/organizations/my'),
  convertToOrganization: () => apiClient.post('/organizations/convert-role'),
  verifyOrganization: (id, data) => apiClient.put(`/organizations/admin/${id}/verify`, data),
  getAllOrganizationsAdmin: () => apiClient.get('/organizations/admin/all'),
  addMember: (id, data) => apiClient.post(`/organizations/${id}/members`, data),
  removeMember: (id, userId) => apiClient.delete(`/organizations/${id}/members/${userId}`),
  getMembers: (id) => apiClient.get(`/organizations/${id}/members`)
};

// NOTIFICATION API
export const notificationAPI = {
  getNotifications: () => apiClient.get('/notifications'),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`)
};

export default apiClient;
