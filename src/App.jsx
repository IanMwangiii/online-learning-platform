
import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  };

  const handleUserClick = () => {
    setCurrentView('profile');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
  };

  return (
    <>
      <Navbar onUserClick={handleUserClick} onHomeClick={handleHomeClick} />
      {currentView === 'home' && <Home />}
      {currentView === 'profile' && <UserProfile user={user} />}
    </>
  );
}

export default App;
