import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CourseList from './components/CourseList';
import Sidebar from './components/Sidebar';
import UserProfile from './components/UserProfile';
// import Modal from './components/Modal';
import Notification from './components/Notification';
import Breadcrumbs from './components/Breadcrumbs';
import Pagination from './components/Pagination';
import ProgressTracker from './components/ProgressTracker';
import VideoPlayer from './components/VideoPlayer';
import CourseCard from './components/CourseCard';
import LessonCard from './components/LessonCard';
import DiscussionThread from './components/DiscussionThread';
import DiscussionForm from './components/DiscussionForm';
import EnrollButton from './components/EnrollButton';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
        <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* Add other routes here */}
        <Route path="/courses" element={<CourseList courses={[{ id: 1, title: 'React Basics', description: 'Learn the basics of React.' }]} />} />
        {/* Other routes can be added similarly */}
      </Routes>
    </Router>
      <Sidebar />
      <div className="main-content">
        {/* Example of using some components */}
        <CourseList courses={[{ id: 1, title: 'React Basics', description: 'Learn the basics of React.' }]} />
        <UserProfile />
        <ProgressTracker completed={5} total={10} />
        <VideoPlayer videoUrl="https://example.com/video.mp4" />
        <DiscussionThread thread={{ title: 'Discussion Title', content: 'Discussion content goes here.' }} />
        <DiscussionForm onSubmit={(data) => console.log('Submitted:', data)} />
        {/* <Modal isOpen={true} onClose={() => console.log('Modal closed')}>
          <h2>Modal Content</h2>
        </Modal> */}
        <Notification message="Welcome to the course platform!" type="success" />
        <Breadcrumbs path={[{ label: 'Home', url: '/' }, { label: 'Courses', url: '/courses' }]} />
        <Pagination currentPage={1} totalPages={5} onPageChange={(page) => console.log('Page changed to:', page)} />
        <CourseCard title="Introduction to Programming" description="Learn the fundamentals of programming." />
        <LessonCard title="Getting Started with JavaScript" description="Introduction to JavaScript basics." />
        <EnrollButton isEnrolled={false} onEnroll={() => console.log('Enroll button clicked')} />
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <Footer />
    </>
  );
}

export default App;
