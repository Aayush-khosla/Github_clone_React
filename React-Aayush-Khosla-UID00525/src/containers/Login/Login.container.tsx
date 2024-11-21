import { Container, Box, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'features/UserSlice';
import { RootState } from 'store';
import { Loginform } from 'components';

import { useLazyLoginQuery } from 'service';

const LoginContainer: React.FC = () => {
  const [triggerLogin] = useLazyLoginQuery();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user != null && !!Cookies.get('token')) {
      navigate('/profile');
    }
  }, [navigate, user]);

  const validateFields = (): boolean => {
    let isValid = true;
    if (!username) {
      setUsernameError(true);
      setUsernameHelperText('Username is required');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameHelperText('');
    }
    if (!password) {
      setPasswordError(true);
      setPasswordHelperText('Password is required');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
    }
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    console.log("error")
    try {
      const result = await triggerLogin({ username, token: password }).unwrap();
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
      Cookies.set('token', password, { expires: 14 });
      navigate('/profile');
    } catch (err) {
      let message: string;
      if (typeof err === 'object' && err !== null && 'status' in err) {
        const status = (err as { status?: number }).status;

        if (status === 401) {
          message = 'Login failed. Please check your credentials.';
        } else {
          message = 'Something went wrong.';
        }
      } else {
        message = 'An unexpected error occurred.';
      }

      setErrorMessage(message);
      setOpenErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpenErrorSnackbar(false);
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Box
        sx={{
          border: '0.02rem solid #ccc',
          borderRadius: '0.5rem',
          padding: 2,
          boxShadow: 2,
        }}
      >
        <Loginform
          username={username}
          password={password}
          loading={loading}
          usernameError={usernameError}
          usernameHelperText={usernameHelperText}
          passwordError={passwordError}
          passwordHelperText={passwordHelperText}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
        />
      </Box>

      <Snackbar open={openErrorSnackbar} autoHideDuration={5000}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginContainer;
