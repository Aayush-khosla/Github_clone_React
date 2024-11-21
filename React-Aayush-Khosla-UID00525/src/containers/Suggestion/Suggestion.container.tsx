import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import {
  setUsers,
  removeUser,
  resetUsers,
  User,
} from 'features/SuggestionsSlice';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Card,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyFetchSuggestionUsersQuery, useFollowMutation } from 'service';
import { increaseFollowers } from 'features/UserSlice';

const SuggestionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const [triggerFetch, { data: users = [], isError }] =
    useLazyFetchSuggestionUsersQuery();
  const currentUsers = useSelector(
    (state: RootState) => state.suggestion.users,
  );
  const [follow] = useFollowMutation();

  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});

  const getSinceValue = () => {
    if (currentUsers.length === 0) {
      return Math.floor(Math.random() * 5000);
    }
    return (
      Math.max(
        ...currentUsers.map((user) => user.id),
        ...users.map((user: User) => user.id),
      ) + 1
    );
  };

  const fetchUsersIfNeeded = async () => {
    if (currentUsers.length < 6) {
      const usero = await triggerFetch({ token, since: getSinceValue() });
      if (!isError) {
        dispatch(setUsers([...currentUsers, ...usero.data]));
      }
    }
  };

  useEffect(() => {
    fetchUsersIfNeeded();
  }, [currentUsers]);

  const handleRemoveUser = (index: number) => {
    dispatch(removeUser(index));
  };

  const handleReset = () => {
    dispatch(resetUsers());
    fetchUsersIfNeeded();
  };

  const handleFollow = async (username: string) => {
    try {
      await follow({ username, token }).unwrap();
      dispatch(increaseFollowers());
      setFollowStatus((prev) => ({ ...prev, [username]: true }));
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const displayedUsers = currentUsers.slice(0, 3);

  if (currentUsers.length < 3) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
      padding={2}
    >
      <Button
        variant="contained"
        onClick={handleReset}
        sx={{ marginBottom: '1rem', maxWidth: '7.5rem' }}
      >
        Reset Suggestions
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: '62.5rem',
          marginRight: '9.375rem',
        }}
      >
        {displayedUsers.map((user) => (
          <Card
            key={user.login}
            sx={{ width: '18.75rem', padding: '1.25rem', boxShadow: 3 }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{user.login}</Typography>
              <IconButton
                onClick={() => handleRemoveUser(user.id)}
                sx={{ '&:hover': { color: 'red' } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box>
              <Box height="16.25rem">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  width="100%"
                  style={{ borderRadius: '0.5rem' }}
                />
              </Box>
              <Box mt={1}>
                <Button variant="outlined" href={user.html_url} target="_blank">
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: '0.625rem' }}
                  onClick={() => handleFollow(user.login)}
                  disabled={
                    followStatus[user.login] !== undefined &&
                    followStatus[user.login]
                  }
                >
                  {followStatus[user.login] ? 'Following' : 'Follow'}
                </Button>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SuggestionContainer;
