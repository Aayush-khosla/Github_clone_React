import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  name: string;
  email: string;
  location: string;
} | null;

const initialState: UserState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    },
    resetUser: () => null,
    increaseFollowers: (state: UserState) => {
      if (state) {
        state.following += 1;
      }
    },
    decreaseFollowers: (state: UserState) => {
      if (state) {
        state.following -= 1;
      }
    },
  },
});

export const { setUser, resetUser, increaseFollowers, decreaseFollowers } =
  userSlice.actions;
export default userSlice.reducer;
