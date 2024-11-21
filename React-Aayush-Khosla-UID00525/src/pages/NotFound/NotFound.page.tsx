import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
          alt="Error illustration"
          width={500}
          height={250}
          style={{ marginTop: '20px' }}
        />

        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back Home
        </Button>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
