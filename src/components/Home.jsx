import { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import SearchBar from './SearchBar';
import { MenuItem, Select, Typography, CircularProgress, Box } from '@mui/material';

const coursesList = [
  "Introduction to Computer Science",
  "Data Structures and Algorithms",
  "Database Management Systems",
  "Web Development",
  "Software Engineering",
  "Operating Systems",
  "Computer Networks",
  "Cybersecurity",
  "Artificial Intelligence and Machine Learning",
  "Cloud Computing",
  "Mobile App Development",
  "Game Development",
  "Human-Computer Interaction",
  "Big Data and Analytics",
  "Blockchain and Cryptocurrencies",
  "Internet of Things (IoT)",
  // <a href="./internet of things">Internet of Things</a>
];

function Home() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      const fetchCourseInfo = async () => {
        setLoading(true);
        setError(null);

        try {
          // Assuming the API endpoint for course details is `/api/courses/:name`
          const response = await axios.get(`/api/courses/${selectedCourse}`);
          setCourseInfo(response.data);
        } catch (err) {
          setError('Failed to load course details.');
        } finally {
          setLoading(false);
        }
      };

      fetchCourseInfo();
    }
  }, [selectedCourse]);

  return (
    <div>
      <div className='home-page'>
        <div>
          <SearchBar />
          <Box mt={2}>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Select a Course</MenuItem>
              {coursesList.map((course) => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))}
            </Select>
          </Box>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {courseInfo && (
            <Box mt={2}>
              <Typography variant="h4">{courseInfo.title}</Typography>
              <Typography variant="body1">{courseInfo.description}</Typography>
              {/* Add more course details here */}
            </Box>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
