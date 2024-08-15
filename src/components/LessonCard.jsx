import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

const LessonCard = ({ lesson }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{lesson.topic}</Typography>
                <Typography variant="body2">{lesson.content}</Typography>
                {/* Add more fields if necessary */}
            </CardContent>
        </Card>
    );
};

LessonCard.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        // Add more fields if necessary
    }).isRequired
};

export default LessonCard;
