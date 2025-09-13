// src/hooks/useAxiosPrivate.js
import axios from 'axios';
import { useMemo, useEffect } from 'react';
import { api } from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function useAxiosPrivate() {
  const { token, logout } = useAuth();

  const axiosPrivate = useMemo(() => axios.create({
    baseURL: api.defaults.baseURL,
  }), []);

  useEffect(() => {
    const reqId = axiosPrivate.interceptors.request.use(
      (config) => {
        if (token) config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resId = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error?.response?.status === 401) {
          // token expired or invalid
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(reqId);
      axiosPrivate.interceptors.response.eject(resId);
    };
  }, [axiosPrivate, token, logout]);

  return axiosPrivate;
}
