import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ErrorIcon from '@mui/icons-material/Error';
import React, { useState } from 'react';
import {
  useFollowMutation,
  useLazySearchUserQuery,
  useLazyGetFollowingUserQuery,
  useUnfollowMutation,
} from 'service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  decreaseFollowers,
  increaseFollowers,
  UserState,
} from 'features/UserSlice';

const SearchContainer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState(false);
  const token = Cookies.get('token');
  const [isFollowing, setIsFollowing] = useState(false);
  const [triggerSearch, { data: userData, error, isLoading }] =
    useLazySearchUserQuery();
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const [triggerGetFollowing] = useLazyGetFollowingUserQuery();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user) as UserState;
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    triggerSearch({ username: searchQuery, token });
    if (user) {
      try {
        await triggerGetFollowing({ username: searchQuery, token }).unwrap();
        setIsFollowing(true);
      } catch (error) {
        setIsFollowing(false);
      }
    }
  };

  const handleFollowUser = async () => {
    if (userData.login === user?.login) {
      navigate('/profile');
    }
    setFollowing(true);
    if (isFollowing) {
      try {
        await unfollow({ username: userData.login, token }).unwrap();
        await triggerGetFollowing({ username: searchQuery, token }).unwrap();
        dispatch(decreaseFollowers());
      } catch (error) {
        console.error('Failed to follow user:', error);
      } finally {
        setIsFollowing(false);
        setFollowing(false);
      }
    } else {
      try {
        await follow({ username: userData.login, token }).unwrap();
        await triggerGetFollowing({ username: searchQuery, token }).unwrap();
        dispatch(increaseFollowers());
      } catch (error) {
        console.error('Failed to follow user:', error);
      } finally {
        setIsFollowing(true);
        setFollowing(false);
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '80%',
            maxWidth: '25rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Enter GitHub username"
            sx={{ marginBottom: '1rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleSearch} sx={{ padding: '0' }}>
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            textAlign: 'center',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '0.5rem',
            maxWidth: '25rem',
            margin: '0 auto',
            backgroundColor: 'white',
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              width: '23.44rem',
              height: '18.88rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : error ? (
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#D32F2F',
                  backgroundColor: '#FFEBEE',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  marginTop: '1rem',
                }}
              >
                <ErrorIcon sx={{ marginRight: '0.5rem', color: '#D32F2F' }} />
                {'status' in error
                  ? error.status === 404
                    ? 'User Not Found.'
                    : 'Something went wrong.'
                  : error.message || 'Unknown error.'}
              </Typography>
            ) : userData ? (
              <Box sx={{ minWidth: '23.44rem', minHeight: '18.88rem' }}>
                <Avatar
                  src={userData.avatar_url}
                  alt={userData.login}
                  sx={{
                    width: '5rem',
                    height: '5rem',
                    margin: '0 auto',
                    marginBottom: '1rem',
                  }}
                />
                <Typography variant="h6">{userData.login}</Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '0.5rem',
                  }}
                >
                  <Box textAlign="center">
                    <Typography variant="body2">Followers</Typography>
                    <Typography variant="body2">
                      {userData.followers}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="body2">Following</Typography>
                    <Typography variant="body2">
                      {userData.following}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ marginTop: '0.5rem' }}>
                  Bio: {userData.bio || 'This user has no bio.'}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '0.25rem' }}>
                  Location: {userData.location || 'Location not found.'}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                    gap: '0.63rem',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '1.88rem',
                      fontWeight: '200',
                      letterSpacing: '0',
                    }}
                    color={isFollowing ? 'secondary' : 'primary'}
                    onClick={user ? handleFollowUser : () => navigate('/login')}
                    disabled={following}
                  >
                    {user ? (
                      user.login === userData.login ? (
                        'Profile'
                      ) : following ? (
                        <CircularProgress size={24} />
                      ) : isFollowing ? (
                        'UnFollow User'
                      ) : (
                        'Follow User'
                      )
                    ) : (
                      'Login to Follow'
                    )}
                  </Button>

                  <Button
                    variant="contained"
                    href={userData.html_url}
                    target="_blank"
                    sx={{
                      borderRadius: '1.88rem',
                      fontWeight: '200',
                      letterSpacing: '0',
                    }}
                  >
                    View Profile on GitHub
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  width: '23.44rem',
                  height: '18.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1976D2',
                    backgroundColor: '#E3F2FD',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <PersonSearchIcon sx={{ marginRight: '0.5rem' }} />
                  Start by searching for a user.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SearchContainer;
