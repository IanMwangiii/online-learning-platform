import PropTypes from 'prop-types';
import { Box, Typography, LinearProgress, List, ListItem, ListItemText } from '@mui/material';

const ProgressTracker = ({ lessons, completedLessons }) => {
  // Calculate progress
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const completionPercentage = (totalLessons > 0) ? (completedCount / totalLessons) * 100 : 0;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>Course Progress</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1">
          {completedCount} of {totalLessons} lessons completed
        </Typography>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ marginTop: 1 }}
        />
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {completionPercentage.toFixed(2)}% completed
        </Typography>
      </Box>
      <Typography variant="h6" gutterBottom>Completed Lessons</Typography>
      <List>
        {completedLessons.length > 0 ? (
          completedLessons.map((lesson, index) => (
            <ListItem key={index}>
              <ListItemText primary={lesson.title} />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No lessons completed yet." />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

// Prop Types
ProgressTracker.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  completedLessons: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
};

// Default Props
ProgressTracker.defaultProps = {
  lessons: [],
  completedLessons: [],
};

export default ProgressTracker;
