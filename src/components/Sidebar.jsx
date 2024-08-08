// Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleDiscussionClick = () => {
    navigate('/discussions');
  };

  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/courses">
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        <ListItem button onClick={handleDiscussionClick}>
          <ListItemIcon><ForumIcon /></ListItemIcon>
          <ListItemText primary="Discussions" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
