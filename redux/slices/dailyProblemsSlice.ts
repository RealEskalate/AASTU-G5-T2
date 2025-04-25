import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice';

// Define the shape of a problem
interface Problem {
  id: number;
  name: string;
  difficulty: string;
  tag: string[];
  platform: string;
  link: string;
  created_at: string;
  updated_at: string;
  users_solved?: number[];
}

// Define the shape of a daily problems entry
interface DailyProblemsEntry {
  tags: string[];
  problems: Problem[];
}

// Define the shape of the API response (date-keyed object)
interface DailyProblemsData {
  [date: string]: DailyProblemsEntry;
}

// Define the state shape
interface DailyProblemsState {
  data: DailyProblemsData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: DailyProblemsState = {
  data: {},
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

// Async thunk to fetch daily problems
export const fetchDailyProblems = createAsyncThunk<
  DailyProblemsData,
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'dailyProblems/fetchDailyProblems',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<DailyProblemsData>(
          'https://aastu-g5-t2.onrender.com/tracks/5/problems',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
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
            const response = await axios.get<DailyProblemsData>(
              'https://aastu-g5-t2.onrender.com/tracks/5/problems',
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
            return response.data;
          } catch (refreshError) {
            return rejectWithValue('Unauthorized: Unable to refresh access token.');
          }
        }
        throw error;
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to fetch daily problems'
      );
    }
  }
);

const dailyProblemsSlice = createSlice({
  name: 'dailyProblems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyProblems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDailyProblems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchDailyProblems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default dailyProblemsSlice.reducer;