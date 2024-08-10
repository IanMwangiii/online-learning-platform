import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <TextField
        label="Search courses"
        variant="outlined"
        value={query}
        onChange={handleChange}
        sx={{ width: '100%', maxWidth: 600 }}
      />
    </Box>
  );
};

export default SearchBar;
