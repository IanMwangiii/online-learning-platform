import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Rating, Collapse } from '@mui/material';
import LessonCard from './LessonCard'; // Import LessonCard

const CourseCard = ({ id, title, description, imageUrl, price, rating, instructor, instructorImage, lessons = [] }) => {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = () => {
    setEnrolled(true);
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <img src={instructorImage} alt="Instructor" style={{ width: 50, height: 50, borderRadius: '50%' }} />
        </Box>
      </CardContent>
      <CardActions>
        {!enrolled ? (
          <Button size="small" color="primary" onClick={handleEnroll}>Enroll</Button>
        ) : (
          <Collapse in={enrolled}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Lessons:</Typography>
              {lessons.map(lesson => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </Box>
          </Collapse>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;

// components/CourseCard.jsx
// import React from 'react';
// import { Box, Typography, Card, CardMedia, CardContent, CardActions, Button, Rating, Avatar, Grid } from '@mui/material';
// import LessonCard from './LessonCard';

// const CourseCard = ({ title, description, imageUrl, price, rating, instructor, instructorImage, lessons = [] }) => {
//   return (
//     <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3 }}>
//       <CardMedia
//         component="img"
//         height="140"
//         image={imageUrl}
//         alt={title}
//         sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
//       />
//       <CardContent>
//         <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           {description}
//         </Typography>
//         <Typography variant="h6" component="div" color="text.primary" sx={{ mt: 2 }}>
//           Price: {price}
//         </Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//           <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
//             Rating:
//           </Typography>
//           <Rating value={rating} readOnly size="small" />
//         </Box>
//         <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//           <Avatar alt={instructor} src={instructorImage} sx={{ mr: 2, width: 40, height: 40 }} />
//           <Typography variant="body2" color="text.secondary">
//             Instructor: {instructor}
//           </Typography>
//         </Box>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//           Lessons:
//         </Typography>
//         <Grid container spacing={1} mt={1}>
//           {lessons.length > 0 ? (
//             lessons.map(lesson => (
//               <Grid item xs={12} sm={6} md={4} key={lesson.id}>
//                 <LessonCard
//                   title={lesson.title}
//                   description={lesson.description}
//                   videoUrl={lesson.videoUrl}
//                 />
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">No lessons available.</Typography>
//           )}
//         </Grid>
//       </CardContent>
//       <CardActions>
//         <Button size="small" color="primary" sx={{ mx: 'auto', mb: 1 }}>
//           Enroll
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default CourseCard;
