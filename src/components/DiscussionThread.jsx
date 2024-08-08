import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import DiscussionForm from './DiscussionForm';

const DiscussionThread = ({ discussions, onAddDiscussion }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Discussion Thread
      </Typography>
      <List>
        {discussions.map((discussion, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={discussion.user}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {discussion.comment}
                  </Typography>
                  {" — " + discussion.date}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Comment'}
      </Button>
      {showForm && <DiscussionForm onAddDiscussion={onAddDiscussion} />}
    </Box>
  );
};

export default DiscussionThread;
