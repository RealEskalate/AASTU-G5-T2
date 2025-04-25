import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import problemsReducer from './slices/problemsSlice';
import teamCompletionReducer from './slices/teamCompletionSlice';
import dailyProblemsReducer from './slices/dailyProblemsSlice';
import userProgressReducer from './slices/userProgressSlice';
import groupsReducer from  './slices/groupsSlice';
import profileReducer from './slices/profileSlice';
import sessionsReducer from './slices/sessionsSlice';
import contestsReducer from './slices/contestsSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  problems: problemsReducer,
  teamCompletion: teamCompletionReducer,
  dailyProblems: dailyProblemsReducer,
  userProgress: userProgressReducer,
  groups: groupsReducer,
  profile: profileReducer,
  sessions: sessionsReducer,
  contests: contestsReducer,
  
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;