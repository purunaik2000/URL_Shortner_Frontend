import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Progress() {
  return (
    <Box sx={{
        display: 'block',
        position: 'absolute',
        top: '48%',
        left: '48%'
    }} >
      <CircularProgress/>
    </Box>
  );
}
