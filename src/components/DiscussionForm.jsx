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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Add a Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Post
      </Button>
    </Box>
  );
};

export default DiscussionForm;
