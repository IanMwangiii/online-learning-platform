import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const DiscussionThread = ({ discussions }) => {
  return (
    <Box>
      {discussions.map((discussion, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="body1"><strong>{discussion.user}:</strong> {discussion.comment}</Typography>
          <Typography variant="body2" color="textSecondary">{discussion.date}</Typography>
          {index < discussions.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default DiscussionThread;
