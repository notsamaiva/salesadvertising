import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" p={2} textAlign="center" bgcolor="primary.main" color="white">
      <Typography variant="body2">© 2024 Affiliate Dashboard. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
