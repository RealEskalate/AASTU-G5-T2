import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store'; // Adjust path to your store
import { login } from './authSlice'; // Adjust path to your authSlice

// Define the Session type based on the API response
interface Session {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  meet_link: string;
  location: string;
  resource_link: string;
  recording_link: string;
  calendar_event_id: string;
  group_lecturer_id: { [key: string]: number };
  stipend_amount: number;
  created_at: string;
  updated_at: string;
}

// Define the state shape
interface SessionsState {
  sessions: Session[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: SessionsState = {
  sessions: [],
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

// Async thunk to fetch sessions
export const fetchSessions = createAsyncThunk<
  Session[],
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'sessions/fetchSessions',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<{ sessions: Session[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/sessions/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data.sessions;
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
            const response = await axios.get<{ sessions: Session[] }>(
              `${process.env.NEXT_PUBLIC_API_URL}/sessions`,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
            return response.data.sessions;
          } catch (refreshError) {
            return rejectWithValue('Unauthorized: Unable to refresh access token.');
          }
        }
        throw error;
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to fetch sessions'
      );
    }
  }
);

// Create the sessions slice
const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

// Export actions
export const { clearError } = sessionsSlice.actions;

// Export reducer
export default sessionsSlice.reducer;