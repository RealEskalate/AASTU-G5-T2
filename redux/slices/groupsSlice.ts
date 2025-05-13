// app/store/slices/groupsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, AppDispatch } from '../store';
import { login } from './authSlice'; // Assuming authSlice exists

// Define the Group interface based on your data structure
interface Group {
  id: string;
  name: string;
  code: string;
  members: number;
  timeSpent: number;
  avgRating: number;
  problemsSolved?: number;
  students?: Array<{
    id: string;
    name: string;
    solved: number;
    timeSpent: number;
    rating: number;
    lastSeen?: string;
  }>;
}

// Define the state interface
interface GroupsState {
  groups: Group[];
  selectedGroup: Group | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GroupsState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

// Function to get token from cookie
const getAuthToken = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('auth_token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
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

// Async thunk to fetch all groups
export const fetchAllGroups = createAsyncThunk<
  Group[],
  void,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'groups/fetchAllGroups',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token || getAuthToken();
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<Group[]>(`${process.env.NEXT_PUBLIC_API_URL}/groups/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
            const response = await axios.get<Group[]>(`${process.env.NEXT_PUBLIC_API_URL}/groups/`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return response.data;
          } catch (refreshError) {
            return rejectWithValue('Unauthorized: Unable to refresh access token.');
          }
        }
        throw error;
      }
    } catch (error) {
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to fetch groups'
      );
    }
  }
);

// Async thunk to fetch a single group by ID
export const fetchGroupById = createAsyncThunk<
  Group,
  string,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>(
  'groups/fetchGroupById',
  async (groupId, { getState, rejectWithValue, dispatch }) => {
    try {
      let token = getState().auth.token || getAuthToken();
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      try {
        const response = await axios.get<Group>(
          `${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("rgroupppppppppppp:", response)
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
            const response = await axios.get<Group>(
              `${process.env.NEXT_PUBLIC_API_URL}/groups/${groupId}`,
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
        (error as any).response?.data?.message || 'Failed to fetch group details'
      );
    }
  }
);

// Create the slice
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all groups
    builder
      .addCase(fetchAllGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });

    // Fetch single group
    builder
      .addCase(fetchGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGroup = action.payload;
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

// Export actions
export const { clearError } = groupsSlice.actions;

// Export reducer
export default groupsSlice.reducer;