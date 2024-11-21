import { githubApi } from '../GihubApi';

export const followEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getFollowingUser: builder.query({
      query: ({ username, token }) => ({
        url: `/user/following/${username}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetFollowingUserQuery } = followEndpoints;
