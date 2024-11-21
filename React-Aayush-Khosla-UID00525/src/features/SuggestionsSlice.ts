import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

type SuggestionState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const initialState: SuggestionState = {
  users: [],
  loading: false,
  error: null,
};

const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    resetUsers(state) {
      state.users = state.users.slice(3);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUsers, removeUser, resetUsers, setLoading, setError } =
  suggestionsSlice.actions;
export default suggestionsSlice.reducer;
