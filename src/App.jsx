import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import LessonDetail from './components/LessonDetrail'; // Updated import
import Discussions from './components/Discussions';
import UserProfile from './components/UserProfile';
import Enrollment from './components/Enrollment';
import Payment from './components/Payment';
import Footer from './components/Footer';
import './components/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/lessons/:id" element={<LessonDetail />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
