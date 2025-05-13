import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store'; // Adjust path to your store
import { login } from './authSlice'; // Adjust path to your authSlice

// Define the Contest type based on the API response
interface Contest {
  id: number;
  name: string;
  link: string;
  problem_count: number;
  created_at: string;
  updated_at: string;
  unrated: boolean;
  type: string;
}

// Define the state shape
interface ContestsState {
  contests: Contest[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: ContestsState = {
  contests: [],
  status: 'idle',
  error: null,
};

// Async function to refresh access token
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
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

// Async thunk to fetch contests
export const fetchContests = createAsyncThunk<
  Contest[],
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'contests/fetchContests',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<Contest[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/codeforces/contests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Fetched contests:', response.data); // Debugging line
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
            const response = await axios.get<Contest[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/codeforces/contests`,
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
        (error as any).response?.data?.message || 'Failed to fetch contests'
      );
    }
  }
);

// Create the contests slice
const contestsSlice = createSlice({
  name: 'contests',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contests = action.payload;
      })
      .addCase(fetchContests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

// Export actions
export const { clearError } = contestsSlice.actions;

// Export reducer
export default contestsSlice.reducer;