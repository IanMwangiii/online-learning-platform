import { Link } from 'react-router-dom';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Online Learning Platform</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/discussions">Discussions</Link></li>
        <li><Link to="/user-profile">Profile</Link></li>
        <li><Link to="/enrollment">Enrollment</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;