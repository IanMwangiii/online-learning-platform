import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';

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
        aria-label="Add a comment"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!comment.trim()}
        aria-label="Post Comment"
      >
        Post Comment
      </Button>
    </Box>
  );
};

// PropTypes validation for onAddDiscussion
DiscussionForm.propTypes = {
  onAddDiscussion: PropTypes.func.isRequired,
};

export default DiscussionForm;
