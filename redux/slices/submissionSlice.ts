import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// Interface for a single submission
interface Submission {
  id: string;
  name: string;
  timeSpent: string;
  tries: string;
  language: string;
  inContest: number;
  added: string;
  image: string;
}

// Interface for submission data (for submitting)
interface SubmissionData {
  timeSpent: string;
  tries: string;
  language: string;
  code: string;
  problemId?: number; // Added to associate with problem
}

// Interface for submission state
interface SubmissionState {
  timeSpent: string;
  tries: string;
  language: string;
  code: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  submissionResult: any | null;
  submissions: Submission[];
  submissionsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  submissionsError: string | null;
}

// Initial state
const initialState: SubmissionState = {
  timeSpent: '',
  tries: '',
  language: '',
  code: '',
  status: 'idle',
  error: null,
  submissionResult: null,
  submissions: [],
  submissionsStatus: 'idle',
  submissionsError: null,
};

// Async thunk for submitting the problem
export const submitProblem = createAsyncThunk<
  void,
  { problemId: number; timeSpent: number; tries: number; code: string; language: string },
  { state: RootState; rejectValue: string }
>(
  'submission/submitProblem',
  async ({ problemId, timeSpent, tries, code, language }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        return rejectWithValue('No access token found. Please log in.');
      }

      if (!problemId) {
        return rejectWithValue('Problem ID is missing.');
      }

      console.log('Submitting Problem:', { problemId, timeSpent, tries, code, language });

      // Use the NEXT_PUBLIC_API_URL environment variable for the base URL
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://aastu-g5-t2.onrender.com';
      const response = await axios.post(
        `${baseUrl}/submission`,
        {
          problem_id: problemId,
          time_spent: timeSpent,
          tries,
          code,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Submission Response:', response.data);
    } catch (error) {
      console.error('Submission Error:', error);
      return rejectWithValue(
        (error as any).response?.data?.message || 'Failed to submit problem'
      );
    }
  }
);

// Async thunk for fetching submissions by problem ID
export const fetchSubmissionsByProblemId = createAsyncThunk<
  Submission[],
  string,
  { rejectValue: string }
>(
  'submission/fetchSubmissionsByProblemId',
  async (problemId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://aastu-g5-t2.onrender.com/submission?problemId=${problemId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch submissions');
    }
  }
);

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setTimeSpent: (state, action: PayloadAction<string>) => {
      state.timeSpent = action.payload;
    },
    setTries: (state, action: PayloadAction<string>) => {
      state.tries = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    resetSubmission: (state) => {
      state.timeSpent = '';
      state.tries = '';
      state.language = '';
      state.code = '';
      state.status = 'idle';
      state.error = null;
      state.submissionResult = null;
    },
  },
  extraReducers: (builder) => {
    // Submit problem
    builder
      .addCase(submitProblem.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitProblem.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.submissionResult = action.payload;
      })
      .addCase(submitProblem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      // Fetch submissions
      .addCase(fetchSubmissionsByProblemId.pending, (state) => {
        state.submissionsStatus = 'loading';
        state.submissionsError = null;
      })
      .addCase(fetchSubmissionsByProblemId.fulfilled, (state, action: PayloadAction<Submission[]>) => {
        state.submissionsStatus = 'succeeded';
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissionsByProblemId.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.submissionsStatus = 'failed';
        state.submissionsError = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setTimeSpent, setTries, setLanguage, setCode, resetSubmission } = submissionSlice.actions;

export default submissionSlice.reducer;
