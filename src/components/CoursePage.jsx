import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, CircularProgress, Typography, List, ListItem, Paper, Divider } from '@mui/material';
// import ProgressTracker from './ProgressTracker'; // Import the ProgressTracker component

const CoursePage = () => {
    const { courseId } = useParams(); // Retrieve courseId from route parameters
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(0); // State to track current lesson progress

    const fetchCourseDetails = async () => {
        try {
            if (!courseId) {
                throw new Error('Course ID is not defined');
            }
            setLoading(true);

            // Fetch course details
            const courseResponse = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}`);
            setCourse(courseResponse.data);

            // Fetch lessons for the course
            const lessonsResponse = await axios.get(`http://127.0.0.1:5555/api/courses/${courseId}/lessons`);
            setLessons(Array.isArray(lessonsResponse.data) ? lessonsResponse.data : []);

            // For demonstration, setting currentLesson to a random number (replace with real progress logic)
            setCurrentLesson(Math.floor(Math.random() * lessonsResponse.data.length) + 1);
        } catch (err) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: '800px', margin: 'auto', padding: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
                {course?.name || 'Course Name'}
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: 3 }}>
                {course?.description || 'Course Description'}
            </Typography>
            <Divider sx={{ marginBottom: 3 }} />
            {/* <ProgressTracker currentLesson={currentLesson} totalLessons={lessons.length} />  */}
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
                Lessons
            </Typography>
            {lessons.length > 0 ? (
                <List>
                    {lessons.map((lesson) => (
                        <ListItem key={lesson.id} sx={{ marginBottom: 3, padding: 2, borderRadius: 2, boxShadow: 3 }} component={Paper}>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                    {lesson.topic}
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ marginBottom: 2 }}>
                                    {lesson.content}
                                </Typography>
                                {lesson.video_url && (
                                    <Box sx={{ marginBottom: 2 }}>
                                        <video width="100%" controls>
                                            <source src={lesson.video_url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                )}
                            </Box>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No lessons available.</Typography>
            )}
        </Box>
    );
};

export default CoursePage;
