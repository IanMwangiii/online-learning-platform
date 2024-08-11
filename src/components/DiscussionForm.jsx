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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Add a comment"
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Post Comment
      </Button>
    </Box>
  );
};

export default DiscussionForm;
