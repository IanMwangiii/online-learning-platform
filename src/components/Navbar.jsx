import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { FcBusinessman, FcSettings, FcSearch } from 'react-icons/fc';
import { IoMdNotificationsOutline } from "react-icons/io";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="explore-button">EXPLORE</button>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button"><FcSearch /></button>
        </div>
        <div className="nav-links">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="#online-degrees">Online Degrees</Link></li>
            <li className="nav-item"><Link to="#notifications"><IoMdNotificationsOutline /></Link></li>
            <li className="nav-item"><Link to="/login" className='login-link'>Login</Link></li>
            <li className="nav-item"><Link to="/user-profile"><FcBusinessman /></Link></li>
            <li className="nav-item"><Link to="#settings"><FcSettings /></Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

