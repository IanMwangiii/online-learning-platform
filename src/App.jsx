// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CourseList from './components/CourseList';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';
import Pagination from './components/Pagination';
import ProgressTracker from './components/ProgressTracker';
import VideoPlayer from './components/VideoPlayer';
import DiscussionThread from './components/DiscussionThread';
import DiscussionForm from './components/DiscussionForm';
import EnrollButton from './components/EnrollButton';
import SearchBar from './components/SearchBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/courses" element={<CourseList courses={[{ id: 1, title: 'React Basics', description: 'Learn the basics of React.' }]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <div className="main-content">
        <CourseList />
        <ProgressTracker completed={5} total={10} />
        <VideoPlayer videoUrl="https://example.com/video.mp4" />
        <DiscussionThread thread={{ title: 'Discussion Title', content: 'Discussion content goes here.' }} />
        <DiscussionForm onSubmit={(data) => console.log('Submitted:', data)} />
        <Notification message="Welcome to the course platform!" type="success" />
        <Pagination currentPage={1} totalPages={5} onPageChange={(page) => console.log('Page changed to:', page)} />
        <EnrollButton isEnrolled={false} onEnroll={() => console.log('Enroll button clicked')} />
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <Footer />
    </>
  );
}

export default App;
