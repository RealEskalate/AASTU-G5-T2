import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice';
import { Key } from 'readline';

// Define the shape of a problem
interface Problem {
  created_at: any;
  id: Key | null | undefined;
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
  problem: Problem | null; // Store single problem
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProblemsState = {
  problems: [],
  problem: null,
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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      refresh_token: refreshToken,
    });
    const { access_token } = response.data;
    document.cookie = `auth_token=${access_token}; path=/; max-age=3600; SameSite=Strict`;
    return access_token;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Async thunk to fetch all problems
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
          `${process.env.NEXT_PUBLIC_API_URL}/problems/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          const refreshToken = getState().auth.refresh_token;
          if (!refreshToken) {
            return rejectWithValue('No refresh token available. Please log in.');
          }
          try {
            const newToken = await refreshAccessToken(refreshToken);
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
            const response = await axios.get<Problem[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/problems`,
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

// Async thunk to fetch a single problem by ID
export const fetchProblemById = createAsyncThunk<
  Problem,
  string,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'problems/fetchProblemById',
  async (id, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/problems/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          const refreshToken = getState().auth.refresh_token;
          if (!refreshToken) {
            return rejectWithValue('No refresh token available. Please log in.');
          }
          try {
            const newToken = await refreshAccessToken(refreshToken);
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
            const response = await axios.get<Problem>(
              `${process.env.NEXT_PUBLIC_API_URL}/problems/${id}`,
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
        (error as any).response?.data?.message || 'Failed to fetch problem'
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
      // Fetch all problems
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload.map((item: any) => ({
          created_at: item.created_at,
          id: item.id,
          difficulty: item.difficulty,
          name: item.name,
          tag: item.tag?.filter((tag: string) => tag).join(', ') || 'None',
          added: getTimeSince(item.created_at),
          votes: 0,
          link: item.link,
          platform: item.platform,
        }));
      })
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single problem by ID
      .addCase(fetchProblemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblemById.fulfilled, (state, action) => {
        state.loading = false;
        state.problem = {
          created_at: action.payload.created_at,
          id: action.payload.id,
          difficulty: action.payload.difficulty,
          name: action.payload.name,
          tag: typeof action.payload.tag === 'string'
            ? action.payload.tag.split(',').filter((tag: string) => tag.trim()).join(', ')
            : Array.isArray(action.payload.tag)
            ? (action.payload.tag as string[]).filter((tag: string) => tag.trim()).join(', ')
            : 'None', // Fallback if tag is null or another type
          added: getTimeSince(action.payload.created_at),
          votes: 0,
          link: action.payload.link,
          platform: action.payload.platform,
        };
      })
      .addCase(fetchProblemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default problemsSlice.reducer;