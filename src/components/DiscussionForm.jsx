import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const DiscussionForm = ({ onAddDiscussion }) => {
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(''); // Assuming you manage user information elsewhere

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiscussion = {
      user,
      comment,
      date: new Date().toLocaleString(),
    };
    onAddDiscussion(newDiscussion);
    setComment('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">Post Comment</Button>
    </Box>
  );
};

export default DiscussionForm;
