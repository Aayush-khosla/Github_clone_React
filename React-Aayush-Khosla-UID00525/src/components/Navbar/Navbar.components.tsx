import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { resetUser, UserState } from 'features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar() {
  const [userAvatar, setUserAvatar] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user) as UserState;

  useEffect(() => {
    if (user != null) {
      setUserAvatar(user.avatar_url);
    } else {
      setUserAvatar('');
    }
  }, [user]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(resetUser());
    handleClose();
    navigate('/login');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            POD HUB
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Button component={Link} to="/" sx={{ my: 2, color: 'white' }}>
              Home
            </Button>
            {user && Cookies.get('token') ? (
              <>
                <Button
                  component={Link}
                  to="/suggestions"
                  sx={{ my: 2, color: 'white' }}
                >
                  Suggestions
                </Button>
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{ paddingTop: '0.8rem' }}
                  >
                    <Avatar alt="User Profile" src={userAvatar} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ mt: '0.6rem' }}
                  >
                    <MenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                sx={{ my: 2, color: 'white' }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
