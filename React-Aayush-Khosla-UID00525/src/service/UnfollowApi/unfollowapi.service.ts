import { githubApi } from '../GihubApi';

export const unfollowEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    unfollow: builder.mutation({
      query: ({ username, token }) => ({
        url: `/user/following/${username}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUnfollowMutation } = unfollowEndpoints;
