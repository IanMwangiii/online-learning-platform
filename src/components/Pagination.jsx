import React from 'react';
import { Box, Button } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => onPageChange(page)}
          sx={{ mx: 0.5 }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;