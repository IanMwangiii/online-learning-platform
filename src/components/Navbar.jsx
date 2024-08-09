import React from 'react';
import { Link } from 'react-router-dom'; 
import { FcBusinessman, FcSearch } from 'react-icons/fc';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/dashboard');
  };

  return (
    <AppBar position="fixed" sx={{ width: `calc(100%)`, ml: '0px' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>course-TT</Typography>
        <div className="navbar-container">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search..." />
            <button className="search-button"><FcSearch /></button>
          </div>
          <div className="nav-links">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/">Home</Link></li>
              <li className="nav-item"><Link to="/courses">Courses</Link></li>
              <li className="nav-item"><Link to="#notifications"><IoMdNotificationsOutline /></Link></li>
              <li className="nav-item"><Link to="/login" className='login-link'>Login</Link></li>
              <li className="nav-item"><Link to="/user-profile"><FcBusinessman /></Link></li>
            </ul>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
