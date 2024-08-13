import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const DiscussionThread = ({ discussions = [] }) => {
  if (!Array.isArray(discussions)) {
    console.error('Discussions prop is not an array:', discussions);
    return <Typography>Error: Discussions data is not an array</Typography>;
  }

  return (
    <Box>
      {discussions.length > 0 ? (
        discussions.map((discussion, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="body1">
              <strong>{discussion.user || 'Unknown User'}:</strong> {discussion.comment || 'No comment'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {discussion.date || 'No date provided'}
            </Typography>
            {index < discussions.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))
      ) : (
        <Typography>No discussions available</Typography>
      )}
    </Box>
  );
};

export default DiscussionThread;
