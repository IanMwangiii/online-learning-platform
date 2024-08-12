import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button } from '@mui/material';

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 2,
        mb: 3,
        width: '100%',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search courses"
        value={query}
        onChange={handleChange}
        sx={{
          flexGrow: 1,
          mr: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
          },
          '& .MuiInputBase-input': {
            padding: '10px 20px',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 25px',
          borderRadius: '25px',
          backgroundColor: '#1976d2',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#155a9d',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // onSearch is required and should be a function
};

export default SearchBar;
