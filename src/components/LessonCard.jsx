import { Box, Typography, Card, CardContent } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import PropTypes from 'prop-types';

const LessonCard = ({ title, description, videoUrl }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box mt={2}>
          <VideoPlayer videoUrl={videoUrl} title={title} />
        </Box>
      </CardContent>
    </Card>
  );
};

LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

export default LessonCard;
