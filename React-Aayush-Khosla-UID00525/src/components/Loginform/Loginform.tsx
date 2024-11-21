import React from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Avatar,
  Typography,
} from '@mui/material';

const Loginform: React.FC<{
  username: string;
  password: string;
  loading: boolean;
  usernameError: boolean;
  usernameHelperText: string;
  passwordError: boolean;
  passwordHelperText: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({
  username,
  password,
  loading,
  usernameError,
  usernameHelperText,
  passwordError,
  passwordHelperText,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
      </Box>
      <TextField
        margin="normal"
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={onUsernameChange}
        error={usernameError}
        helperText={usernameHelperText}
      />
      <TextField
        margin="normal"
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={onPasswordChange}
        error={passwordError}
        helperText={passwordHelperText}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
    </Box>
  );
};

export default Loginform;
