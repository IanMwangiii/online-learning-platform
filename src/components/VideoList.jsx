import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <Box sx={{ width: 200, height: 200, p: 2, border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Box sx={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%', overflow: 'hidden' }}>
        <iframe
          src={videoUrl}
          title={title}
          frame Border="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></iframe>
      </Box>
    </Box>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoPlayer;