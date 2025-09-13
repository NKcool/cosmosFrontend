// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { api } from '../api/axios';

const initial = { token: null, user: null, loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': return { ...state, ...action.payload, loading: false };
    case 'LOGIN': return { ...state, token: action.payload.token, user: action.payload.user ?? state.user };
    case 'SET_USER': return { ...state, user: action.payload };
    case 'LOGOUT': return { token: null, user: null, loading: false };
    default: return state;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const fetchProfile = async (token) => {
    try {
      const res = await api.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'SET_USER', payload: res.data });
    } catch (e) {
      // 401 -> token expired or invalid
      console.warn('Profile fetch failed', e?.response?.status);
      await logout();
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('auth') || 'null');
    if (stored?.token) {
      dispatch({ type: 'INIT', payload: { token: stored.token, user: null } });
      fetchProfile(stored.token);
    } else {
      dispatch({ type: 'INIT', payload: { token: null, user: null } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    const token = res.data?.token;
    if (!token) throw new Error('No token received');

    localStorage.setItem('auth', JSON.stringify({ token }));
    dispatch({ type: 'LOGIN', payload: { token } });
    await fetchProfile(token);
    return true;
  };

  const register = async ({ name, email, password }) => {
    await api.post('/api/auth/register', { name, email, password });
    // Backend returns only message → Redirect to login page in UI
    return true;
  };

  const logout = async () => {
    localStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(() => ({
    ...state,
    login,
    register,
    logout,
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
