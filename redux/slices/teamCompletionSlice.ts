import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice';

// Define the shape of a team member
interface TeamMember {
  user_id: number;
  name: string;
  solved: number;
  exercises: number;
  available: number;
  completion: number;
}

// Define the state shape
interface TeamCompletionState {
  data: TeamMember[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: TeamCompletionState = {
  data: [],
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

// Async thunk to fetch team completion data
export const fetchTeamCompletion = createAsyncThunk<
  TeamMember[],
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'teamCompletion/fetchTeamCompletion',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<TeamMember[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/tracks/5/progress/1`,
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
            const response = await axios.get<TeamMember[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/tracks/5/progress/1`,
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
        (error as any).response?.data?.message || 'Failed to fetch team completion data'
      );
    }
  }
);

const teamCompletionSlice = createSlice({
  name: 'teamCompletion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamCompletion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeamCompletion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchTeamCompletion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default teamCompletionSlice.reducer;