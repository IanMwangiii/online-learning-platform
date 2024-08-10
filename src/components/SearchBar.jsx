import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      fullWidth
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;
