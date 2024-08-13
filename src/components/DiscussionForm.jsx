import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const DiscussionForm = ({ courseId, onAddDiscussion }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comment.trim()) {
      try {
        const response = await axios.post(`/courses/${courseId}/discussions`, { comment });
        onAddDiscussion(response.data); // Assume the response includes the new discussion
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
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
