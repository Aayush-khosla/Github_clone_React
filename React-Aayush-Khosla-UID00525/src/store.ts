import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserSlice';
import suggestionReducer from './features/SuggestionsSlice';
import { githubApi } from './service/GihubApi';

const store = configureStore({
  reducer: {
    user: userReducer,
    suggestion: suggestionReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
