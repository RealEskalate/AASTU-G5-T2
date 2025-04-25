import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice';

// Define the shape of a problem
interface Problem {
  difficulty: string;
  name: string;
  tag: string;
  added: string;
  votes: number;
  link: string;
  platform: string; 
}

// Define the state shape
interface ProblemsState {
  problems: Problem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProblemsState = {
  problems: [],
  loading: false,
  error: null,
};

// Function to calculate time since creation (e.g., "20h", "2d")
const getTimeSince = (createdAt: string): string => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  return diffHours < 24 ? `${diffHours}h` : `${diffDays}d`;
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

// Async thunk to fetch problems
export const fetchProblems = createAsyncThunk<
  Problem[],
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'problems/fetchProblems',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get(
          'https://aastu-g5-t2.onrender.com/problems/',
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
            const response = await axios.get<Problem[]>(
              'https://aastu-g5-t2.onrender.com/problems',
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
      console.error('Fetch Error:', error);
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to fetch problems'
      );
    }
  }
);

const problemsSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload.map((item: any) => ({
          difficulty: item.difficulty,
          name: item.name,
          tag: item.tag?.filter((tag: string) => tag).join(', ') || 'None', // Updated to use 'tag' from API
          added: getTimeSince(item.created_at),
          votes: 0,
          link: item.link,
          platform: item.platform, // Added platform mapping
        }));
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default problemsSlice.reducer;