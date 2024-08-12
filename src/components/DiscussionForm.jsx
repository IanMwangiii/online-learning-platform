import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const DiscussionForm = ({ onAddDiscussion }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      onAddDiscussion(comment);
      setComment('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <TextField
        fullWidth
        label="Add a comment"
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1976d2',
            },
            '&:hover fieldset': {
              borderColor: '#155a9d',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#155a9d',
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#155a9d',
          },
        }}
      >
        Post Comment
      </Button>
    </Box>
  );
};

export default DiscussionForm;
