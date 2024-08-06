// components/CourseCard.jsx
import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Rating } from '@mui/material';

const CourseCard = ({ title, description, imageUrl, price, rating, instructor }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <Typography variant="h6" component="div" color="text.primary">Price: {price}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">Rating:</Typography>
          <Rating value={rating} readOnly size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">Instructor: {instructor}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Enroll</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
