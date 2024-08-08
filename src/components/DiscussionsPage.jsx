
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DiscussionThread from './DiscussionThread';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions((prevDiscussions) => [...prevDiscussions, newDiscussion]);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Discussions</Typography>
      <DiscussionThread discussions={discussions} onAddDiscussion={handleAddDiscussion} />
    </Box>
  );
};

export default DiscussionsPage;
