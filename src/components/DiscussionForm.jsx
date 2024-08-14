import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

const DiscussionForm = ({ courseId, onAddDiscussion }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (comment.trim() && courseId) {
      try {
        const response = await axios.post(`/courses/${courseId}/discussions`, { comment });
        onAddDiscussion(response.data);
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } else {
      console.error('Course ID is missing or comment is empty');
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

DiscussionForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  onAddDiscussion: PropTypes.func.isRequired,
};

export default DiscussionForm;
