// core/components/Footer/index.tsx
import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 4,
        mt: 'auto',
        backgroundColor: theme =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Typography variant='body2' color='text.secondary' align='center'>
        {`© Copyright ${currentYear} GN. All rights reserved by Parul University.`}
      </Typography>
    </Box>
  );
};

export default Footer;
