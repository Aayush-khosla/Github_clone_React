import { UserState } from 'features/UserSlice';
import { githubApi } from '../GihubApi';

export const loginEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<UserState, { username?: string; token: string }>({
      query: ({ token }) => ({
        url: 'user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginQuery, useLazyLoginQuery } = loginEndpoints;
