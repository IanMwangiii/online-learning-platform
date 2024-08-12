import React, { useState } from 'react';
import { Box } from '@mui/material';
import DiscussionThread from './DiscussionThread';
import DiscussionForm from './DiscussionForm';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);

  const handleAddDiscussion = (newComment) => {
    const newDiscussion = {
      user: 'Current User', // Replace with actual user
      comment: newComment,
      date: new Date().toLocaleString(),
    };
    setDiscussions([...discussions, newDiscussion]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <DiscussionForm onAddDiscussion={handleAddDiscussion} />
      <DiscussionThread discussions={discussions} />
    </Box>
  );
};

export default DiscussionsPage;