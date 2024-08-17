import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DiscussionThread from './DiscussionThread';
import DiscussionForm from './DiscussionForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiscussionsPage = () => {
  const { id } = useParams();
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}/discussions`);
        setDiscussions(response.data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
        setError('Failed to fetch discussions');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [id]);

  const handleAddDiscussion = (newDiscussion) => {
    setDiscussions([...discussions, newDiscussion]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <DiscussionForm courseId={id} onAddDiscussion={handleAddDiscussion} />
      <DiscussionThread discussions={discussions} />
    </Box>
  );
};

export default DiscussionsPage;
