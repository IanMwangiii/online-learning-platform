import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import CoursePage from './components/CoursePage';
import Login from './components/Login';
import Signup from './components/Signup';  
import UserProfile from './components/UserProfile';
import PaymentPage from './components/PaymentPage';
import DiscussionsPage from './components/DiscussionsPage';

function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handlePaymentSuccess = (courseId) => {
    setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, courseId]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/courses" element={<CourseList enrolledCourses={enrolledCourses} onEnroll={handlePaymentSuccess} />} />
        <Route path="/course/:id" element={<CoursePage enrolledCourses={enrolledCourses} />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment/:courseId" element={<PaymentPage onPaymentSuccess={handlePaymentSuccess} />} />
        <Route path="/discussions" element={<DiscussionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
