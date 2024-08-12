import PropTypes from 'prop-types';
import { Box, Typography, Divider } from '@mui/material';

const DiscussionThread = ({ discussions }) => {
  return (
    <Box>
      {discussions.map((discussion) => (
        <Box key={discussion.id} sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>{discussion.user}:</strong> {discussion.comment}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {discussion.date}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

// PropTypes validation for discussions
DiscussionThread.propTypes = {
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DiscussionThread;
