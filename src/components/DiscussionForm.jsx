import React, { useState } from 'react';
import { TextField, Button, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const DiscussionForm = ({ courseId, onAddDiscussion }) => {
  const [comment, setComment] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseId) {
      setSnackbarMessage('Course ID is missing.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (comment.trim()) {
      try {
        const response = await axios.post(`/api/courses/${courseId}/discussions`, { comment });
        onAddDiscussion(response.data);
        setComment('');
        setSnackbarMessage('Comment posted successfully!');
        setSnackbarSeverity('success');
      } catch (error) {
        console.error('Error posting comment:', error);
        setSnackbarMessage('Failed to post comment. Please try again.');
        setSnackbarSeverity('error');
      } finally {
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 4 }}>
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
              borderColor: '#1565c0',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#1976d2',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        Post Comment
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DiscussionForm;
