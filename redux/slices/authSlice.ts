import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refresh_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refresh_token: null,
  loading: false,
  error: null,
};

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  status: number;
}

interface JwtPayload {
  email: string;
  role: string;
  exp: number;
  tokenType: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, credentials);
      const decoded: JwtPayload = jwtDecode(response.data.access_token);
      const user: User = {
        id: decoded.email,
        email: decoded.email,
      };
      // Store token in cookies
      document.cookie = `auth_token=${response.data.access_token}; path=/; max-age=3600; SameSite=Strict`;
      return {
        user,
        token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      console.log('Logout action dispatched');
      state.user = null;
      state.token = null;
      state.refresh_token = null;
      localStorage.removeItem('persist:root');
      document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Strict';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string; refresh_token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refresh_token = action.payload.refresh_token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;