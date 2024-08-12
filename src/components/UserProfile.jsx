import { useEffect, useState } from 'react';
import { fetchUsers } from '../api';
import './App.css';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers();
      setUser(usersData[0]); // Assuming the first user is the logged-in user
    };
    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h2>{user.name} Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

export default UserProfile;