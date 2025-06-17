import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HeaderTopBar = () => {
  return (
    <Box
      sx={{
        bgcolor: '#f0f0f0',
        py: 0.5,
        px: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
        color: '#555',
      }}
    >
      <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
        Welcome to worldwide Megamart!
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button color="inherit" size="small" sx={{ fontSize: 'inherit', textTransform: 'none' }}>
          <LocationOnIcon sx={{ fontSize: 'inherit', mr: 0.5 }} />
          Deliver to 423651
        </Button>
        <Button color="inherit" size="small" sx={{ fontSize: 'inherit', textTransform: 'none' }}>
          Track your order
        </Button>
        <Button color="inherit" size="small" sx={{ fontSize: 'inherit', textTransform: 'none' }}>
          All Offers
        </Button>
      </Stack>
    </Box>
  );
};

export default HeaderTopBar; 