import axios from "axios";
import { toast } from 'react-toastify';
import { useAuthStore } from "../store/userAuthStore";
import { jwtDecode } from 'jwt-decode';

const API_URI = "https://gallery-app-backend-0j9u.onrender.com/api/user"


// Create axios instance
const apiClient = axios.create({
  baseURL: API_URI,
  withCredentials: true,
  timeout: 10000,
});

interface RefreshResponse {
  success: boolean;
  accessToken: string;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp <= currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<RefreshResponse>(
      `${API_URI}/refresh-token`,
      {},
      { withCredentials: true }
    );

    if (response.data.success && response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      console.log('Token refreshed:', response.data);

      // Update token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', newAccessToken);
      }

      // Update auth store
      useAuthStore.getState().setAuth(true);

      // Set cookie
      // document.cookie = `accessToken=${newAccessToken}; path=/; max-age=${60 * 60}; SameSite=Lax`;

      return newAccessToken; // ✅ Actually return the token
    }
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// ✅ Fixed: Make request interceptor async and handle token refresh properly
apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');

    if (token) {
      if (isTokenExpired(token)) {
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            token = newToken;
          } else {
            // Clear auth state and redirect to login
            useAuthStore.getState().setAuth(false);
            localStorage.removeItem('accessToken');
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(new Error('Session expired. Please login again.'));
          }
        } catch (error) {
          // Handle refresh token failure
          useAuthStore.getState().setAuth(false);
          localStorage.removeItem('accessToken');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(new Error('Session expired. Please login again.'));
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Enhanced response interceptor with token refresh retry
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }

      // If refresh fails, clear auth and redirect
      localStorage.removeItem('accessToken');
      useAuthStore.getState().setAuth(false);
      toast.error("Session expired. Please login again.");

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };

