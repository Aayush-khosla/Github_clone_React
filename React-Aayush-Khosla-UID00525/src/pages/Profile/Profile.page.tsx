import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Avatar, Box, Typography, CircularProgress } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PeopleIcon from '@mui/icons-material/People';
import FollowersIcon from '@mui/icons-material/Group';
import { UserState } from 'features/UserSlice';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user) as UserState;

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <section>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: '700', marginTop: '1.3rem' }}
      >
        Welcome, {user.name ? user.name : user.login}!
      </Typography>

      <Box
        sx={{
          width: { xs: '90%', sm: '80%' },
          maxWidth: '56.25rem',
          margin: '4rem auto',
          padding: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '1.25rem',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '30%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            paddingTop: '4rem',
          }}
        >
          <Avatar
            alt={user.login || 'User Avatar'}
            src={user.avatar_url ?? ''}
            sx={{
              height: '10rem',
              width: '10rem',
              marginBottom: '1rem',
              border: '4px solid #fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            }}
          />
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: '900', color: '#333' }}
          >
            {user.login}
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', sm: '70%' },
            padding: '1.5rem',
            borderRadius: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Typography variant="body1" sx={{ color: '#666' }}>
            {user.bio || 'Your bio is empty.'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#666',
            }}
          >
            <LocationOnIcon color="action" />
            <Typography variant="body1">
              {user.location || 'Location not specified.'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#666',
            }}
          >
            <EmailIcon color="action" />
            <Typography variant="body1">
              {user.email || 'Email not provided.'}
            </Typography>
          </Box>

          {/* GitHub Profile Link */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #ccc',
              paddingTop: '1rem',
              marginTop: '1rem',
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <GitHubIcon color="action" />
              <a
                href={user.html_url ?? ''}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: '#1976d2' }}
              >
                GitHub Profile
              </a>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FollowersIcon color="primary" />
              <Typography variant="body1" color="textSecondary">
                {user.followers} Followers
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PeopleIcon color="primary" />
              <Typography variant="body1" color="textSecondary">
                {user.following} Following
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default ProfilePage;
