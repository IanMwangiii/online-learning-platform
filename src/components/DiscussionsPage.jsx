import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DiscussionThread from './DiscussionThread';
import DiscussionForm from './DiscussionForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiscussionsPage = () => {
  const { id } = useParams();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    // Fetch discussions for the specific course
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(`/courses/${id}/discussions`);
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussions();
  }, [id]);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([...discussions, newDiscussion]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <DiscussionForm courseId={id} onAddDiscussion={handleAddDiscussion} />
      <DiscussionThread discussions={discussions} />
    </Box>
  );
};

export default DiscussionsPage;
