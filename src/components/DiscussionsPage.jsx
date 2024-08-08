import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DiscussionForm from './DiscussionForm';
import DiscussionThread from './DiscussionThread';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([newDiscussion, ...discussions]);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Discussions</Typography>
      <DiscussionForm onAddDiscussion={handleAddDiscussion} />
      <DiscussionThread discussions={discussions} onAddDiscussion={handleAddDiscussion} />
    </Box>
  );
};

export default DiscussionsPage;
