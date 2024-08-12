import { Link } from 'react-router-dom';
import { FcBusinessman } from 'react-icons/fc';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationManager'; // Import the custom hook

function Navbar() {
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate('/dashboard');
  };

  const handleNotificationClick = () => {
    addNotification('New course added!', 'info'); // Use the context method to add a notification
  };

  return (
    <>
      <AppBar position="fixed" sx={{ height: '64px' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>course-TT</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div className="nav-links">
              <ul className="nav-list" style={{ display: 'flex', alignItems: 'center', padding: 0, margin: 0, listStyle: 'none' }}>
                <li className="nav-item" style={{ marginRight: '16px' }}><Link to="/">Home</Link></li>
                <li className="nav-item" style={{ marginRight: '16px' }}><Link to="/courses">Courses</Link></li>
                <li className="nav-item" style={{ marginRight: '16px' }}>
                  <IconButton color="inherit" onClick={handleNotificationClick}>
                    <IoMdNotificationsOutline />
                  </IconButton>
                </li>
                <li className="nav-item" style={{ marginRight: '16px' }}><Link to="/login" className='login-link'>Login</Link></li>
                <li className="nav-item"><Link to="/user-profile"><FcBusinessman /></Link></li>
              </ul>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: '64px' }} />
    </>
  );
}

export default Navbar;
