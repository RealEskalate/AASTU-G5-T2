import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '@/types/users';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  auth: {
    token: string | null;
  };
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const config = token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {};

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?group_short_name=g55`, config);

      // Map API response to User type
      const mappedUsers: User[] = response.data.users.map((apiUser: any) => ({
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        role: apiUser.role,
        group: apiUser.group,
        backgroundImage: apiUser.photo || '/placeholder.svg',
        avatar: apiUser.photo || '/placeholder.svg',
        bgColor: '#000000', // Default background color
        socialLinks: [
          apiUser.github && { name: 'GitHub', icon: '/github.svg', url: apiUser.github },
          apiUser.leetcode && { name: 'LeetCode', icon: '/leetcode.svg', url: apiUser.leetcode },
          apiUser.codeforces && { name: 'Codeforces', icon: '/codeforces.svg', url: apiUser.codeforces },
          apiUser.instagram && { name: 'Instagram', icon: '/instagram.svg', url: apiUser.instagram },
        ].filter(Boolean) as { name: string; icon: string; url: string }[],
        stats: {
          problems: 0, // Placeholder: Update with real data if available
          submissions: 0, // Placeholder: Update with real data if available
          dedicatedTime: '0h', // Placeholder: Update with real data if available
        },
      }));

      return mappedUsers;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;