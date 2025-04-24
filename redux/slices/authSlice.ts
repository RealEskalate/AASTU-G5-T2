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
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Interface for the API response
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  message: string;
  status: number;
}

// Interface for the JWT payload (adjust based on actual JWT content)
interface JwtPayload {
  email: string;
  role: string;
  exp: number;
  tokenType: string;
  // Add id if present in the JWT
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>('https://aastu-g5-t2.onrender.com/auth/login', credentials);
      console.log('Login response:', response.data);

      // Decode the JWT to extract user info
      const decoded: JwtPayload = jwtDecode(response.data.access_token);

      // Construct the user object
      const user: User = {
        id: decoded.email, // Use email as id if no id is provided; adjust if id exists
        email: decoded.email,
      };

      return {
        user,
        token: response.data.access_token,
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
      state.user = null;
      state.token = null;
      localStorage.removeItem('persist:root');
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
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
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