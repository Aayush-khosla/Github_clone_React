import { githubApi } from '../GihubApi';

export const followEndpoints = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    follow: builder.mutation({
      query: ({ username, token }) => ({
        url: `/user/following/${username}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFollowMutation } = followEndpoints;
