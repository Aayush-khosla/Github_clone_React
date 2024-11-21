import { githubApi } from '../GihubApi';

export const SearchEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query({
      query: ({ username, token }) => ({
        url: `users/${username}`,
        headers: {
          Authorization: token ? `Bearer ${token}` : ' ',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazySearchUserQuery } = SearchEndpoints;
