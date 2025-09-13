import axios from 'axios';

export const api = axios.create({
  baseURL: '',
  // If you use HttpOnly cookies for refresh/session, you must enable credentials:
  withCredentials: true,
});
