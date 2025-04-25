import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Profile {
  id: number;
  name: string;
  email: string;
  photo: string;
  university: string;
  role: string;
  country: string;
  joined_date: string;
  expected_graduation_date: string;
  short_bio: string;
  leetcode: string;
  codeforces: string;
  github: string;
  instagram: string;
  phone: string;
  student_id: string;
  telegram_username: string;
  group: string;
  department: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk to fetch profile data with token
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://aastu-g5-t2.onrender.com/auth/myprofile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === 200) {
        return response.data.profile;
      } else {
        return rejectWithValue('Failed to fetch profile');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;