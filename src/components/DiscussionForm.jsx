import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

const DiscussionForm = ({ topic, content, comment, user_id, course_id, onAddDiscussion }) => {
  const [newComment, setNewComment] = useState(comment || '');  // Use a different name to avoid conflict

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() && course_id) {
      try {
        const response = await axios.post(`/courses/${course_id}/discussions`, { 
          topic, 
          content, 
          comment: newComment, 
          user_id 
        });
        onAddDiscussion(response.data);
        setNewComment('');
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
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Post Comment
      </Button>
    </Box>
  );
};

DiscussionForm.propTypes = {
  topic: PropTypes.string,
  content: PropTypes.string,
  comment: PropTypes.string,
  user_id: PropTypes.number.isRequired,
  course_id: PropTypes.number.isRequired,
  onAddDiscussion: PropTypes.func.isRequired,
};

export default DiscussionForm;
