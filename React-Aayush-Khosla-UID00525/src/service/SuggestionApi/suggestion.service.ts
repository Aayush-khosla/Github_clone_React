import { githubApi } from '../GihubApi';

export const SuggestionUserEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSuggestionUsers: builder.query({
      query: ({ since = 0, per_page = 6, token }) => ({
        url: 'users',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          since,
          per_page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyFetchSuggestionUsersQuery } = SuggestionUserEndpoints;
