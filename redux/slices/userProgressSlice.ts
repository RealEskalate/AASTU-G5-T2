import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice';

// Define the shape of user progress
interface UserProgress {
  user_id: number;
  name: string;
  solved: number;
  exercises: number;
  available: number;
  completion: number;
}

// Define the state shape
interface UserProgressState {
  data: UserProgress | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: UserProgressState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async function to refresh access token
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post('https://aastu-g5-t2.onrender.com/auth/refresh', {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data;
    // Update cookie
    document.cookie = `auth_token=${access_token}; path=/; max-age=3600; SameSite=Strict`;
    return access_token;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Async thunk to fetch user progress
export const fetchUserProgress = createAsyncThunk<
  UserProgress,
  number, // user_id
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'userProgress/fetchUserProgress',
  async (userId, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        // Assuming the API supports filtering by user_id via query parameter
        const response = await axios.get<UserProgress[]>(
          `https://aastu-g5-t2.onrender.com/tracks/5/progress/1?user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userProgress = response.data.find((item) => item.user_id === userId);
        if (!userProgress) {
          return rejectWithValue('User progress not found.');
        }
        return userProgress;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          // Attempt to refresh token
          const refreshToken = getState().auth.refresh_token;
          if (!refreshToken) {
            return rejectWithValue('No refresh token available. Please log in.');
          }
          try {
            const newToken = await refreshAccessToken(refreshToken);
            // Update auth state with new token
            const { user } = getState().auth;
            if (user) {
              dispatch(
                login.fulfilled(
                  { user, token: newToken, refresh_token: refreshToken },
                  'auth/login',
                  { email: user.email, password: '' }
                )
              );
            }
            // Retry the original request with new token
            const response = await axios.get<UserProgress[]>(
              `https://aastu-g5-t2.onrender.com/tracks/5/progress/1?user_id=${userId}`,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
            const userProgress = response.data.find((item) => item.user_id === userId);
            if (!userProgress) {
              return rejectWithValue('User progress not found.');
            }
            return userProgress;
          } catch (refreshError) {
            return rejectWithValue('Unauthorized: Unable to refresh access token.');
          }
        }
        throw error;
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to fetch user progress'
      );
    }
  }
);

const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userProgressSlice.reducer;