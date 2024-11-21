import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes/theme';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes/routes';
import { useLazyLoginQuery } from 'service';
import Cookies from 'js-cookie';
import { resetUser, setUser } from 'features/UserSlice';
import { Box, CircularProgress } from '@mui/material';

const App: React.FC = () => {
  const [triggerLogin, { isLoading }] = useLazyLoginQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const result = await triggerLogin({ token }).unwrap();
          const userData = {
            login: result?.login,
            name: result?.name,
            email: result?.email,
            location: result?.location,
            avatar_url: result?.avatar_url,
            html_url: result?.html_url,
            followers: result?.followers,
            following: result?.following,
            public_repos: result?.public_repos,
            bio: result?.bio,
          };
          dispatch(setUser(userData));
        } catch (err) {
          Cookies.remove('token');
          dispatch(resetUser());
        }
      }
    };
    fetchUserData();
  }, [triggerLogin, dispatch]);

  if (isLoading) {
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
