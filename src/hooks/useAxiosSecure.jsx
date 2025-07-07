import axios from 'axios';
import { useMemo } from 'react';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

const baseURL = import.meta.env.VITE_API_URL;

const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();

  const axiosSecure = useMemo(() => {
    const instance = axios.create({ baseURL });

    // Request interceptor: async to fetch fresh JWT
    instance.interceptors.request.use(
      async config => {
        if (user && user.getIdToken) {
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor: handle 401/403
    instance.interceptors.response.use(
      res => res,
      error => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          logoutUser()
            .then(() => {
            })
        }
        return Promise.reject(error);
      }
    );

    return instance;
    // Only re-create if user/signOutUser changes
  }, [user, logoutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
