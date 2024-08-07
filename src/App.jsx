// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CourseList from './components/CourseList';
import UserProfile from './components/UserProfile';
import Notification from './components/Notification';
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
    </>
  );
}

export default App;
